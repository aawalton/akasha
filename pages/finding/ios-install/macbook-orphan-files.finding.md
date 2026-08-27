---
id: de2973f7-9cce-5850-9614-0593e53e21ae
page-type-slug: finding
title: "Macbook orphan files"
domain-slug: domain/ios-install
---

# Claim

Fifty-one smilingjenny files stand uncommitted on the macbook with no seat and no project owning them, so every install pass has to decide for itself whether they are work in progress or debris.

# Evidence

Reported by the `ios-install` seat on 2026-08-09, from the macbook checkout read before the build-175 cut: fifty-one files under the smilingjenny package, byte-identical and untouched since 2026-08-08 16:57:37, with no owning seat and no project row naming them.

They were re-measured against that cut and found to have zero merge overlap, so the fast-forward the build needs is clean and they do not block a cut today. That is the whole reason they have survived: `ship-install` reads the machine, finds them harmless, and moves on.

What makes them a finding rather than a note is the rule the same task carries — another seat's uncommitted work is left where it stands, and the seat reaching it is the one to ask. There is no seat to reach. So each pass re-derives the same judgment from the same evidence, and the day one of them touches a path the merge needs, the pass stops with nobody to route to.

The two readings the evidence cannot separate are the point: abandoned work whose seat is long gone, and work someone means to come back to. Both look exactly like this.
