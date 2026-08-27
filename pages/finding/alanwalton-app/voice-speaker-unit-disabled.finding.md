---
id: cff37b4f-56ce-5ce3-9b0d-caa362c942c2
slug: voice-speaker-unit-disabled
page-type-slug: finding
title: "Voice speaker unit disabled"
domain-slug: domain/alanwalton-app
---

# Claim

The `voice-speaker.service` systemd user unit, which speaks Alan's agent inbox aloud, is neither running nor enabled, while `ops voice speak --help` describes it as an independent `Restart=always` unit kept outside the fleet so spoken delivery survives a fleet die-off. A unit that is `linked`/`disabled` and `inactive` restarts nothing and does not come back at login, so a persona sending Alan a message today is delivered silently rather than in her cloned voice.

# Evidence

Measured on 2026-08-08 while ingesting `dirty/code/packages-alanwalton-personas-docs-standing-conventions-voice.md`.

`systemctl --user is-active voice-speaker.service` prints `inactive` and exits 3.

`systemctl --user list-unit-files` lists the two voice units differently:
`voice-listener.service  enabled  disabled` and `voice-speaker.service  linked  disabled`.
The listener is enabled; the speaker is linked into the unit tree but not enabled, so it does not start at login.

The design intent it is measured against is the verb's own help. `ops voice speak --help` describes the command as "Run the spoken-delivery daemon in the FOREGROUND (speaks alan's inbox aloud via TTS). The ExecStart of the independent Restart=always voice-speaker.service systemd user unit, outside the fleet so spoken delivery survives a fleet die-off."

The rest of the path is live, so this is the only broken link in it. `packages/alanwalton/voice/cli/src/voice/alan-inbox.ts` is tracked and 229 lines; its `resolvePersonaSpec` (a local const at line 72) resolves a sender through `resolveVoiceSpec` and clones through `cloneUtterance` at line 122, with a Kokoro fallback in the play half so a resolution miss degrades to a generic voice rather than silence. 40 of 42 persona rows are voiced across the two tiers.

Not judged here: whether the unit is deliberately started on demand rather than enabled. This is state I did not create and did not change. Nothing in `~/memory` mentioned `voice-speaker` before this finding — `rg -l -i "voice-speaker"` over that root exited 1.
