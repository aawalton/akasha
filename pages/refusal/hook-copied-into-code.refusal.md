---
id: 3f178391-c156-5013-a90a-bb963bd77616
slug: hook-copied-into-code
page-type-slug: refusal
title: "Hook copied into code"
holes:
  - name
  - registered
  - path
---

# Refusal

`{name}` is registered as `{registered}` — quoted here exactly as `settings/agents.json` carries it — and this repository tracks a file of that name at `{path}`, which is a path inside this checkout. Nothing fires that copy and nothing compares the two, so it drifts from the guard that does fire, and whoever reads it cannot tell which of the two is the live one.

No hook is excepted: every one belongs under `tools/hooks/`.
