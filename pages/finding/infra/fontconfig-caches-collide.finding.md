---
id: 5378e6b0-f2fd-5382-a057-ca5c8ada7988
page-type-slug: finding
title: "Two fontconfig builds share one cache directory, and while both stand Chromium renders no text"
domain-slug: domain/global
---

# Claim

Two fontconfig builds share one cache directory on the workstation, and while both sets of files stand there Chromium renders no text at all.

# Evidence

The system carries fontconfig 2.17.0 at `/usr/bin` and Homebrew carries 2.18.1 at `/home/linuxbrew/.linuxbrew/bin`, which is first on `PATH`. The two write different cache generations into the one `~/.cache/fontconfig`: on 2026-08-19 it held 64 `cache-9` files written at 05:50 that morning beside 65 `cache-11` files.

Homebrew's `fonts.conf` names `/System/Library/Fonts` and `/Library/Fonts`, which are macOS paths. Its `fc-list` reports 0 fonts on this machine; the system's reports 779.

Measured on one binary and one page, changing nothing but the cache directory. Chromium screenshotting a line of monospace text wrote a blank 726-byte image against `~/.cache/fontconfig` as it stood, and a 3978-byte image with text against a fresh empty cache directory. Moving the directory aside and rebuilding it with the system `fc-cache -f` left 64 `cache-9` files and no `cache-11` files, and the same screenshot came back at 3978 bytes.

What this cost: Chromium's renderer took SIGTRAP inside `SkFontMgr_FontConfigInterface.cpp:163`, Skia's font-fallback path, every time the editor gate opened a file. `coredumpctl` recorded the dumps and `ui/gfx/render_text_harfbuzz.cc` logged hundreds of runs reading `font: '', glyph_count: 0`. The promote gate refused every build from about 2026-08-18 19:58 until the cache was rebuilt.

Nothing on a timer accounts for the 05:50 write. `systemctl list-timers` names no font job, and the journal for that minute carries nothing about fonts. So what re-poisons the directory is unidentified, and it can recur.
