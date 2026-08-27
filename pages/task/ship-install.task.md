---
id: 8e9a4b87-fa1e-5174-a525-bab867c1f970
page-type-slug: task
title: "Ship install"
slug: ship-install
domain-parent-slug: domain/ios-install
required-reading-slugs:
  - page-type/task
---

# Definition

- **Ship install** — putting a build on Alan's device.

# Sequence

1. **What this install would carry.**
   - **Read** `ops mobile cut-status`. It answers for akasha wherever it is run from, honouring `CODE_ROOT` only where that names a directory that is there.
   - **List** two populations, because nothing but the prose says a change is waiting on a device and stage 5 acts differently on each: the intent lines a previous install already asked Alan to confirm and he has not, and the intent lines you hold open on something only a real device shows.

2. **The machine, before anything is built.**
   - **Read** the macbook's checkout and everything uncommitted in it over ssh. The build fast-forwards that checkout to the shipped tip, so being behind mends itself, but anything uncommitted on a path the merge touches aborts it, untracked included, and an edit the merge misses rides into the build.
   - **Compare** each uncommitted file against main by hash before calling the machine dirty. A checkout far behind reports main's own content as modified, which reads exactly like an edit in progress. Matching hashes make the tree safe to clear, never safe to build over: git aborts on content it already has.
   - **Clear** what the hashes matched: `git add` the modified files, `rm` the untracked ones. Staging sets the index entry to the bytes already in the tree, which is what the merge refused over, and a deletion comes back when the merge runs, because main holds it.
   - **Leave** another seat's uncommitted work where it stands and reach that seat instead.
   - **Stop** where the machine is not clean and say what holds it.

3. **The install.**
   - **Run** `ops mobile deploy-testflight --wait`. Without it a build that processed but was never distributed reads exactly like one sitting on Alan's phone.

4. **What only the install can show.**
   - **Run** every verification held back for a real device or for a file the build regenerates, which is the whole reason those projects are held open rather than failed.
   - **Read** a green from the post-land deploy's simulator sweep as no reading at all where the build window was held. An active sim driver or a dirty mac checkout makes it skip: exit 0, no alert, one log line, so a seat reading the exit code is told it passed.
   - **Take** what the widget shows from Alan alone. `scripts/build-sim.sh` deletes `ValuesWidgetExtension.appex` from the installed bundle, the simulator rejecting its null `CFBundleVersion`, so a simulator, a preview and CI each report on a build the widget is not in.
   - **Treat** a verification that fails here as a change that shipped broken rather than as something to fix before speaking. It is already on his device, so the notice still goes and names which change is not working.

5. **The one notice.**
   - **Send** Alan a single notice covering every change this install carries, because the value of the install is spent by telling him three times about one build.
   - **Name**, for each change, what he must do to see it. A change that arrived on the deploy and one that needed the install look identical from where he stands, and a surface read without the step it needs shows him retired code and reads as a failure.
   - **Leave** standing every intent line this install put in front of him, and remove one only when he says he has seen it. The notice is spent the moment he reads it, so an intent struck on the build's word makes a change he never looked at read exactly like one he approved.
