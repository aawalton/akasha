---
id: 40931698-55d5-560d-9150-a59df0ab2cc8
page-type-slug: finding
title: "Design tokens import pulls against editor independence"
domain-slug: domain/code-editor
---

# Claim

Two of the editor's intents pull against each other. It should resolve everything its build needs inside its own checkout, and it should draw Alan's colours as the design system's own tokens. #18479 met the second by adding a `@shared/design-tokens` import to the ops extension, reached only by a symlink into the code repository — so meeting the second moved the first further off. Nobody has judged which gives, and a mirrored palette held by a check is a third option neither intent names.

# Evidence

## What stands

`domains/code-editor.md` carries the intent "The editor's build resolves everything it needs inside its own checkout, with no code repository beside it." Alan separately ruled, on #18479, that a terminal tab is drawn in the design system's own token rather than the nearest ANSI slot.

## What #18479 did

`extensions/ops/src/seat/value-color.ts` imports `BLUE, GREEN, ORANGE, PURPLE, RED, YELLOW` from `@shared/design-tokens`. That resolves through `extensions/ops/node_modules/@shared/design-tokens`, a symlink to `/var/home/walton/code/packages/shared/design/tokens`. `ORANGE` is `rgb(190, 90, 10)`, converted to `#be5a0a` in the extension.

The seat's reasoning is on the file: "A hex spelled in this repository would be a second copy with nothing watching it, and the whole of this project is that Alan sees the design system's own colour rather than a near one."

## Why this is not merely the coupling that already stood

`extensions/ops/esbuild.mts` documents the coupling and names its own removal condition — once no file under `src` imports `@shared/*` or `@agents/shared/*` at all — and lists the imports standing when it was written. This adds one more, so that condition is further off than the note says.

## The option neither intent names

A copy is unwatched only if nothing watches it. `check-design-tokens` already holds the TypeScript declarations against `tokens.css`, which is the same guard a mirrored palette in the editor repo would need. So "a second copy with nothing watching it" describes the copy that was declined rather than every possible copy.

## Where the intent already stands

`tools/promote.sh` mounts the code repository at two paths and says mounting one without the other fails the bundle or the compile. The editor's build does not resolve everything inside its own checkout today, with or without this change. This is about the direction of travel, not a state #18479 broke.
