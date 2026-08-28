---
id: da536541-2632-5045-8c45-b55970663671
slug: widget-gate-default-inverted-in-prose
page-type-slug: finding
title: "Widget gate default inverted in prose"
domain-slug: domain/alanwalton-app
---

# Claim

Three prose sites inside section 4 of `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh` say the WidgetKit widget seam is gated OFF by default, while the constant about 2,350 lines above them defaults it ON. A reader opening section 4 to learn whether a build embeds the widget is told the skip branch is the default, and every build takes the other one. What the two readings differ on is whether a second bundle id enters the shared archive path for the whole fleet.

# Evidence

Read from `/var/home/walton/code` on 2026-08-08, in `packages/alanwalton/native-shell/scripts/apply-ios-seam.sh`, 2614 lines, tracked.

The constant, line 63:

    WIDGET_ENABLED="${NATIVE_SHELL_WIDGET:-1}"

Unset resolves to 1. Lines 55-62 above it agree and say why: the provisioning and the full-manual archive-time signing are proven, "so §4 is gated ON by default: every native-shell build embeds the widget. NATIVE_SHELL_WIDGET=0 is the explicit escape hatch".

The three that disagree, lines 2412, 2413 and 2416:

    # shared archive path for the whole fleet, so §4 runs ONLY when NATIVE_SHELL_WIDGET=1.
    # The default-off branch leaves the App target untouched — a clean single-target
    # archive identical to the pre-widget seam.
    if [[ "$WIDGET_ENABLED" != "1" ]]; then
      echo "OK: widget seam (§4) SKIPPED — NATIVE_SHELL_WIDGET is not set (fleet-safe default)."

The branch is right: it skips when the value is not 1. What is wrong is what the prose says the default is. "The default-off branch" and "is not set (fleet-safe default)" are both false, since an unset variable takes the other branch. The echo is the site that reaches a reader who is not reading the source: it prints on a build that set NATIVE_SHELL_WIDGET=0 deliberately, and tells that reader the skip happened because nothing was set.

The distance is what hides it — the constant at line 63, the contradicting prose at 2412, in one file.

Found while ingesting `dirty/code/packages-alanwalton-native-shell-docs-native-seams.md`, whose line 140 reads "Gated ON by default (`NATIVE_SHELL_WIDGET`, #15097)" and matches the constant. That document is being emptied, so afterwards the correct reading stands only in the constant.

Filed apart from `pages/finding/akasha-repo/quarantined-doc-references-dangle.finding.md`, which counts this same script's dangling `See docs/…` comments: that class is about targets that no longer exist, this is about prose contradicting a constant in the same file.
