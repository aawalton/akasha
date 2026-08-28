---
id: 1c72fc74-55f5-516c-ab2d-9a5b27050342
page-type-slug: finding
slug: edit-and-mv-still-read-dash-as-a-filename
title: "Edit and mv still read dash as a filename"
domain-slug: domain/pages-system
---

# Claim

`payloadText` in `patches/patch.ts` still resolves `-` as a filename rather than as stdin for `ops edit` and `ops mv`, so the help promise that `-` is stdin is unkept.

# Evidence

Read 2026-08-27.

The help for `ops edit` at `edit.command.code.attachment.ts:149` states that `-` is stdin and the default. `ops write --help` said nothing about `-` at all.

`payloadText` at `patches/patch.ts:44-61` resolves the payload flag value against the working directory and reads it, so `-` is a filename there and never stdin. It remains in `patches/patch.ts` backing `ops edit` and `ops mv` after `ops write` was pointed at `tools/lib/payload.ts`, whose `readsPayload` and `readPayload` honour `-` as stdin.

Both fail closed, so neither loses a body — the loss recorded in `write-drops-its-payload-and-lands-the-removal-alone` was confined to `ops write`. Three commands, one promise, one shared function that has never kept it, which is why three separate agents rediscovered it independently. The old version cannot go until `ops edit` and `ops mv` are moved too.
