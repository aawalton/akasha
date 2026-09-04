#!/usr/bin/env python3
"""Stage 2 — SRPO (FLUX.1-dev preference fine-tune) low-denoise skin refine.

Builds a ComfyUI API-format graph that runs the SeedVR2 stage-1 output back
through SRPO as a low-denoise img2img pass and submits it to the running
upscale ComfyUI daemon (host 127.0.0.1, published port). SRPO is a FLUX
fine-tune purpose-built to remove plastic/over-smoothed skin; at low denoise
(~0.18) it refines skin micro-texture while preserving SeedVR2's structure
(eyes, hair, edges) and identity.

Host-runnable: talks to the daemon over HTTP with stdlib urllib only. The
SaveImage node writes into the container output dir, which is bind-mounted to
$UPSCALE_HOME/outputs on the host. LoadImage reads from the container input
dir, so the caller must place <image-name> under $UPSCALE_HOME/inputs first
(bin/upscale-srpo.sh does this).

Exit non-zero on submit error, execution error, or missing output — the caller
must not treat a silent no-op as success.
"""
import argparse
import json
import sys
import time
import urllib.error
import urllib.request

POSITIVE = (
    "natural realistic human skin with visible pores and fine surface texture, "
    "subtle natural skin imperfections, photographic, 35mm film grain, "
    "sharp detailed eyes and hair, matte skin, no plastic sheen, no waxy smoothing"
)


def _post(base, path, payload):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{base}{path}", data=data, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _get(base, path):
    with urllib.request.urlopen(f"{base}{path}", timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def build_graph(a):
    return {
        "1": {"class_type": "UnetLoaderGGUF", "inputs": {"unet_name": a.unet}},
        "2": {"class_type": "DualCLIPLoader", "inputs": {
            "clip_name1": a.t5, "clip_name2": a.clip_l, "type": "flux"}},
        "3": {"class_type": "VAELoader", "inputs": {"vae_name": a.vae}},
        "4": {"class_type": "LoadImage", "inputs": {"image": a.image}},
        "5": {"class_type": "VAEEncode", "inputs": {
            "pixels": ["4", 0], "vae": ["3", 0]}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {
            "text": POSITIVE, "clip": ["2", 0]}},
        "7": {"class_type": "FluxGuidance", "inputs": {
            "conditioning": ["6", 0], "guidance": a.guidance}},
        "8": {"class_type": "CLIPTextEncode", "inputs": {"text": "", "clip": ["2", 0]}},
        "9": {"class_type": "ModelSamplingFlux", "inputs": {
            "model": ["1", 0], "max_shift": 1.15, "base_shift": 0.5,
            "width": a.width, "height": a.height}},
        "10": {"class_type": "KSampler", "inputs": {
            "model": ["9", 0], "seed": a.seed, "steps": a.steps, "cfg": 1.0,
            "sampler_name": "euler", "scheduler": "simple",
            "positive": ["7", 0], "negative": ["8", 0],
            "latent_image": ["5", 0], "denoise": a.denoise}},
        "11": {"class_type": "VAEDecode", "inputs": {
            "samples": ["10", 0], "vae": ["3", 0]}},
        "12": {"class_type": "SaveImage", "inputs": {
            "images": ["11", 0], "filename_prefix": a.prefix}},
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--base", default="http://127.0.0.1:8677")
    p.add_argument("--image", required=True, help="filename in the container input dir")
    p.add_argument("--prefix", required=True, help="SaveImage filename_prefix")
    p.add_argument("--width", type=int, required=True)
    p.add_argument("--height", type=int, required=True)
    p.add_argument("--denoise", type=float, default=0.18)
    p.add_argument("--guidance", type=float, default=3.5)
    p.add_argument("--steps", type=int, default=20)
    p.add_argument("--seed", type=int, default=12345)
    p.add_argument("--unet", default="srpo-Q6_K.gguf")
    p.add_argument("--t5", default="t5xxl_fp8_e4m3fn.safetensors")
    p.add_argument("--clip_l", default="clip_l.safetensors")
    p.add_argument("--vae", default="ae.safetensors")
    p.add_argument("--timeout", type=int, default=1200, help="max seconds to wait")
    a = p.parse_args()

    graph = build_graph(a)
    client_id = f"upscale-srpo-{a.prefix}"
    try:
        res = _post(a.base, "/prompt", {"prompt": graph, "client_id": client_id})
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        print(f"ERROR: /prompt rejected the graph ({e.code}): {body}", file=sys.stderr)
        return 1
    except urllib.error.URLError as e:
        print(f"ERROR: cannot reach ComfyUI at {a.base}: {e}", file=sys.stderr)
        return 1

    prompt_id = res.get("prompt_id")
    if not prompt_id:
        print(f"ERROR: no prompt_id in response: {res}", file=sys.stderr)
        return 1
    print(f"submitted prompt_id={prompt_id}; waiting (denoise={a.denoise}, "
          f"guidance={a.guidance}, steps={a.steps})…")

    deadline = time.monotonic() + a.timeout
    while time.monotonic() < deadline:
        time.sleep(3)
        try:
            hist = _get(a.base, f"/history/{prompt_id}")
        except urllib.error.URLError:
            continue
        entry = hist.get(prompt_id)
        if not entry:
            continue
        status = entry.get("status", {})
        if status.get("status_str") == "error":
            msgs = status.get("messages", [])
            print(f"ERROR: execution failed: {json.dumps(msgs)[:800]}", file=sys.stderr)
            return 1
        outputs = entry.get("outputs", {})
        imgs = outputs.get("12", {}).get("images", [])
        if imgs:
            fn = imgs[0].get("filename")
            print(f"OK: saved {fn}")
            return 0
        if status.get("completed") and not imgs:
            print(f"ERROR: completed with no image output: {json.dumps(status)[:400]}",
                  file=sys.stderr)
            return 1
    print(f"ERROR: timed out after {a.timeout}s waiting for prompt {prompt_id}",
          file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
