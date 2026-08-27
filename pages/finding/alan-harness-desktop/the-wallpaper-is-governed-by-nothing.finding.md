---
id: f1c9b2f4-76b9-5cbd-be39-544e36a66b9c
page-type-slug: finding
title: "The wallpaper is governed by nothing"
domain-slug: domain/alan-harness-desktop
---

# Claim

Alan's desktop wallpaper flips to a persona's portrait whenever he types to her, and no instruction document anywhere mentions it. Its policy sits in three ungoverned places: image files under ~/Pictures, a `wallpaperDir` field on a database row, and an untracked KDE config. One of the three has rotted where nothing could see it.

# Evidence

Verified by me, 2026-08-11, except where marked.

**No domain names it.** `grep -ril wallpaper domains/` returns zero files, against 428 domains across 549 live documents.

**The chain.** `tools/hooks/persona-last-messaged-hook.sh:56` fires on `UserPromptSubmit` and runs `bun ops persona stamp-last-messaged --follow --agent-id "$AGENT_ID"`, which selects from the persona's `wallpaperDir` and applies it with `plasma-apply-wallpaperimage`. Alan confirmed the behaviour from his side.

**Three ungoverned homes.** Images under `~/Pictures/Wallpapers/Personas/`, in no repository. `wallpaperDir` is a field on the persona page row, so which directory a persona draws from is decided by data (survey-reported; I did not open the row). `~/.config/plasma-org.kde.plasma.desktop-appletsrc` is untracked.

**The rot.** That KDE config carries an `org.kde.slideshow` block with `SlidePaths=/home/walton/Pictures/Wallpapers/Abby/`. `ls` on it returns `No such file or directory` — the personas moved under `Personas/`. It is inert rather than harmful: `wallpaperplugin=org.kde.image` on all four containments, so that plugin is not selected. I first reported it as live policy and corrected it when Alan pushed back.

**Known residual defect, from the hook's own header (lines 24-31):** a harness-native `ScheduleWakeup` or auto-compact continuation is a bare prompt the classifier cannot tell from Alan's, so a rare cosmetic mis-flip happens, self-correcting on his next real message.
