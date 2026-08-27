---
id: a6cdad58-4a6f-5a03-8789-a7ac215b4c04
page-type-slug: old-ops-command
title: "Ops temper errors list"
slug: ops-temper-errors-list
domain-parent-slug: domain/ops-temper-errors
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/errors/list.ts
path: temper errors list
---

# Definition

- **Ops temper errors list** — the game's captured Lua errors still firing, with the fixed and the extinct held back.

# Help

Read TemperErrors.lua, Zod-parse the on-disk SavedVariablesData, classify
each captured Lua-error entry live|stale, and emit the LIVE entries.

ZO_SavedVars stores account-wide tables under Default → @<account> →
$AccountWide; this command walks every account's $AccountWide.entries and
merges them into a single output stream.

TemperErrors.lua is a CUMULATIVE log — counts/lastSeenAt persist as residue
long after a fix lands or an addon is disabled, so a raw listing surfaces
phantom (already-fixed / extinct) errors as live backlog. Each entry is
marked STALE when EITHER signal fires, else LIVE:
  - fixed:   in-repo owner — its source dir last changed at/after the error
             last fired (git log on the owning addon's repoRelDir).
  - recency: any owner — the error is more than --stale-after-hours behind
             the log frontier (max lastSeenAt), i.e. it stopped firing.
Default stdout shows LIVE only; suppressed stale entries are reported as a
loud footer on stderr. --include-stale / --all show everything.

Default stdout: TSV with one row per shown entry. Columns:
  liveness\tlastSeenAt\tcount\tcharacter\tworld\tapiVersion\tbuild\ttriage\tmessagePreview\tcallstack

  - liveness is 'live' or 'stale' (stale only appears under --include-stale).
  - lastSeenAt is rendered as ISO 8601 UTC.
  - build is the loaded-build-identity stamp '<addon>@<sha>' (the attributed
    addon and the short git SHA whose bytes were in RAM when the error fired);
    '<addon>@?' when the addon is known but its build id wasn't registered;
    '~<culprit>@<sha>' when the crash had no attributable frame but its signature
    maps to a likely-culprit addon (build read from the capture-time snapshot);
    and '-' when neither attributable nor inferable. Lets a stale-RAM re-crash be
    told apart from a genuine recurrence without a manual build check.
  - triage compares that loaded build against the latest-DEPLOYED build id
    (read from <live>/AddOns/<addon>/build-id.lua). The build id advances on
    every deploy, so a behind-the-deploy client has loaded != deployed:
      'stale-ram'        loaded != deployed — client running OLDER bytes it never
                         /reloadui'd onto the deploy. A reload clears it.
      'live-recurrence'  loaded == deployed (on the latest bytes and still
                         crashing → genuine, e.g. a guard-coverage gap), or
                         attributable/inferable but loaded build unknown.
      'unknown'          no attributable or inferable addon, or no deployed
                         build readable for it.
    For an unattributed crash (no user:/AddOns/ frame) whose signature maps to a
    likely culprit (the CraftStoreFixed_*/Cook* family → TemperCrafting), the
    comparison runs on that culprit using the loaded-build snapshot. A raw crash
    is NEVER itself proof of stale-RAM — only a provable loaded != deployed is.
  - messagePreview is the first line of the entry's message, truncated to
    120 chars with an ellipsis when longer.
  - callstack is the captured stack traceback flattened to one line (frames
    joined with ' <- '), truncated to 200 chars. It attributes
    base-game-file errors back to the originating addon. Legacy entries whose
    traceback was lost (null) render as '(no callstack)'.

--json stdout: a single-line JSON array of the shown ErrorEntry objects,
each with additive 'liveness', 'livenessReason', 'triage', and 'triageReason'
fields (stable field names — callers may depend on them), plus 'inferredCulprit'
({addon, loadedBuildId, deployedBuildId}) when an unattributed crash mapped to one.

Empty case: no captured entries at all prints '(no errors captured)';
entries present but all stale prints '(no live errors)' (TSV) / '[]' (JSON).
