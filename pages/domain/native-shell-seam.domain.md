---
id: 17cecaf7-fe51-5de2-a862-c9f2f0ce299b
page-type-slug: domain
title: "Native shell seam"
slug: native-shell-seam
domain-parent-slug: repo/code-repo
---

# Definition

- **Native shell seam** — the parts of the iOS native seam authored once and applied by every shell.

# Design

A stamp is written in the same step whose skipping it would otherwise hide.

No flag skips a stamp.

The app stamp is appended last, and its strip runs to the end of the file.

The widget stamp is written between the widget source copy and the Xcode project rebuild.

The Swift a stamp emits is an `@objc` class.

A marker's spelling is shared with the cut's build-stamp gate, and the two move in one commit.
