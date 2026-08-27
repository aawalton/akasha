---
id: 8660c39f-83d4-56e7-850f-e7fa235d14b8
slug: unknown-service-exits-operational
page-type-slug: finding
title: "Unknown service exits operational"
domain-slug: ops-command/ops-inference-voice-design
---

# Claim

`ops inference voice-design` refuses an unrecognised `--service` as an operational failure and exits
3, where `ops inference generate` refuses the same mistake as an input error and exits 1. Both are a
caller naming a backend that does not exist, and a script branching on the exit code sees one as
something outside the process that may succeed on a retry.

# Evidence

Run against the live tree, both before and after the bodies moved into the instructions repository:

  $ ops inference voice-design --instruct x --text y --service bogus
  unknown --service 'bogus'; choose one of: voxcpm2, qwen3-tts
  exit 3

  $ ops inference generate --prompt x --service bogus
  --service must be one of image-gen, image-gen-base, ..., segment-rembg, got 'bogus'
  exit 1

The split was in the code repository before the move.
`tools/commands/inference/voice-design.ts:120-123` raises it from its
`isBackendName` arm, while `tools/commands/inference/generate.ts:137-139` raises `InputError` from
its `z.enum(INFERENCE_SERVICES).safeParse` arm. Both were carried across unchanged and both exit
codes were diffed byte-for-byte against the pre-move capture, so the move neither introduced nor
repaired this.

`pages/domain/command-exit-input.domain.md` and `pages/domain/command-exit-operational.domain.md` state the distinction the two are being sorted by: input is the
invocation being wrong and the caller fixing it, operational is something outside the process
failing. An unrecognised `--service` is the first on either verb, which makes `voice-design` the
one standing in the wrong class.
