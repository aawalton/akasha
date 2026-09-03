from __future__ import annotations

import io

import uvicorn
from fastapi import FastAPI, Form, HTTPException, UploadFile
from fastapi.responses import PlainTextResponse, Response
from PIL import Image
from rembg import new_session, remove

_SESSIONS: dict[str, object] = {}


def _session(model: str) -> object:
    cached = _SESSIONS.get(model)
    if cached is None:
        cached = new_session(model)
        _SESSIONS[model] = cached
    return cached


def _parse_bgcolor(raw: str) -> tuple[int, int, int, int]:
    """Parse '#RRGGBB' or 'R,G,B[,A]' into an RGBA tuple (alpha defaults 255)."""
    text = raw.strip()
    if text.startswith("#"):
        hexpart = text[1:]
        if len(hexpart) != 6:
            raise ValueError(f"hex color must be #RRGGBB, got '{raw}'")
        r, g, b = (int(hexpart[i : i + 2], 16) for i in (0, 2, 4))
        return (r, g, b, 255)
    parts = [p.strip() for p in text.split(",") if p.strip() != ""]
    if len(parts) not in (3, 4):
        raise ValueError(f"color must be '#RRGGBB' or 'R,G,B[,A]', got '{raw}'")
    nums = [int(p) for p in parts]
    if any(n < 0 or n > 255 for n in nums):
        raise ValueError(f"color channels must be 0-255, got '{raw}'")
    if len(nums) == 3:
        nums.append(255)
    return (nums[0], nums[1], nums[2], nums[3])


def _png_bytes(image: Image.Image) -> bytes:
    buf = io.BytesIO()
    image.save(buf, format="PNG")
    return buf.getvalue()


app = FastAPI()


@app.get("/")
def health() -> PlainTextResponse:
    return PlainTextResponse("ok\n")


@app.post("/segment")
async def segment(
    image: UploadFile,
    output: str = Form("matte"),
    model: str = Form("birefnet-portrait"),
    bgcolor: str = Form(""),
    alpha_matting: str = Form("false"),
) -> Response:
    if output not in ("matte", "cutout", "flatten"):
        raise HTTPException(status_code=400, detail=f"output must be matte|cutout|flatten, got '{output}'")
    raw = await image.read()
    try:
        src = Image.open(io.BytesIO(raw)).convert("RGBA")
    except Exception as err:
        raise HTTPException(status_code=400, detail=f"cannot decode image: {err}") from err

    session = _session(model)
    am = alpha_matting.strip().lower() in ("1", "true", "yes", "on")

    if output == "matte":
        matte = remove(src, session=session, only_mask=True, alpha_matting=am)
        return Response(content=_png_bytes(matte.convert("L")), media_type="image/png")

    if output == "cutout":
        cut = remove(src, session=session, alpha_matting=am)
        return Response(content=_png_bytes(cut.convert("RGBA")), media_type="image/png")

    if bgcolor.strip() == "":
        raise HTTPException(status_code=400, detail="output=flatten requires bgcolor")
    try:
        rgba = _parse_bgcolor(bgcolor)
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err)) from err
    cut = remove(src, session=session, alpha_matting=am).convert("RGBA")
    background = Image.new("RGBA", cut.size, rgba)
    background.alpha_composite(cut)
    return Response(content=_png_bytes(background.convert("RGB")), media_type="image/png")


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=18101)
    args = parser.parse_args()
    uvicorn.run(app, host=args.host, port=args.port, log_level="info")


if __name__ == "__main__":
    main()
