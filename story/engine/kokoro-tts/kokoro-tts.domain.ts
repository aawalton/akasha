import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const kokoroTts = {
  id: "01a17ea9-8aea-71a1-a676-ce7d8072067f",
  type: "page-type/domain",
  slug: "kokoro-tts",
  definition: "the open-weight text-to-speech model hexgrad publishes",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Kokoro" }],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro-82M v1.0, released 2025-01-27, speaks 8 languages in 54 voices.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Kokoro-82M v1.1-zh, released 2025-02-26, speaks English and Chinese in 103 voices.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Hexgrad's pages list no Kokoro release after v1.1-zh.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro's weights are on Hugging Face at `hexgrad/Kokoro-82M` under Apache 2.0.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro's inference code at `github.com/hexgrad/kokoro` is under Apache 2.0.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Hexgrad states Kokoro trained only on permissive or non-copyrighted audio.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro's training audio includes synthetic audio from closed TTS models.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro's training audio includes the CC BY sets Koniwa and SIWIS.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro releases no audio encoder and clones no voice.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro has 82 million parameters, built on StyleTTS 2 and ISTFTNet.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro's v1.0 weights file is 327 MB.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro runs on CPU, on CUDA GPUs and on Apple Silicon through MPS.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Kokoro runs in PyTorch through `kokoro` and in ONNX Runtime through `kokoro-onnx`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro-FastAPI measures Kokoro at 35x to 100x real time on an RTX 4060 Ti 16GB.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Kokoro-FastAPI holds 2.4 to 4.0 GB of VRAM on an RTX 4060 Ti, CUDA context included.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Kokoro-FastAPI streams first audio in about 300 ms on GPU and 3.5 s on an older i7.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Kokoro-FastAPI streams first audio in under 1 s on an M3 Pro CPU.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "`kokoro-onnx` states near real time on an M1 Mac, from a quantized model of about 80 MB.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Running Kokoro yourself costs no licence fee.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Artificial Analysis prices Kokoro at $0.65 per million characters, the cheapest it lists.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "DeepInfra serves Kokoro at $0.99 per million characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Together AI serves Kokoro at $4.00 per million characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Replicate runs Kokoro on an Nvidia T4 at about $0.00034 a run.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Artificial Analysis's speech arena ranks Kokoro 82M v1.0 58th, at Elo 1063.",
    },
  ],
  createdAt: "2026-10-27T18:40:02.793Z",
  updatedAt: "2026-10-27T18:40:02.793Z",
} as const satisfies Domain
