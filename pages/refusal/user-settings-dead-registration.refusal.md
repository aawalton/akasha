---
id: f2a0684e-61d0-539a-8950-7692a6f74009
slug: user-settings-dead-registration
page-type-slug: refusal
title: "User settings dead registration"
holes:
  - path
  - command
  - script
---

# Refusal

{path} registers `{command}`, and `{script}` names no file in this repository. The client runs that command, gets a non-zero exit, and treats it as non-blocking — so the hook is inert for every session started without `--settings`.
