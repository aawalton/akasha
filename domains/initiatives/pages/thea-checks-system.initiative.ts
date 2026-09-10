import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "Every check has a decision, a check and an audit, each its own module of files.",
      workingMemory:
        "code-check holds nine member files from its type alone, no check page saying so; heldIn reads .audit.code.ts as a property. checking loads .check.code.ts where it is there, and judging states Auditing, taking the root alone. 16 of 55 are migrated, in slug order through instant-property-slug-closes-with-at, one a landing. A check already holding an Asking splits cleanest; a judgement over bodies alone drops its scratch roots. An audit takes everythingIn(root).changed with shadowAt(root).",
    },
    {
      statement:
        "Each check runs as its own spawned process, held to the ceilings its page states.",
      workingMemory:
        "checks/modules/checking loads a check in process, code-check naming loadedBySlug module/checking, so nothing stops a check that never yields. utils/run/running spawns with cpuCeiling in seconds, held by a per-run cgroup and a 50ms watcher, and timeout in milliseconds for wall, and has no memory ceiling. code-file-property states max-cpu-seconds, max-wall-seconds and max-memory-mb; only test states one, maxCpuSeconds 5, which code-tests reads off the page.",
    },
    {
      statement: "Every check is cheap enough for audit.",
      workingMemory:
        "Split off the patch sequence, which ends at turning a check on at patch. The cost over the whole repository is judged here. runsOnAudit is false on every check by Alan's call, an audit being asked for one check at a time. file-has-its-page over the whole tree read 120804 paths, 4.15s wall and 1.74GB peak added, but that count is the change's size rather than the check's own. file-length reads it in 1.9s but peaks 2.8GB. It cannot reach audit until no tracked file is unclaimed.",
    },
    {
      statement: "Every check is green.",
      workingMemory:
        "Was the last of the steps taken over each check, split off because a check goes on at patch before the tree reaches zero and so is on while still refusing. Nothing measures greenness per check yet. file-has-its-page is the worked case: 629 files claimed by no page, none refused today because patch judges only what a change has. instant-property-slug-closes-with-at is on and green. Touching a file no page claims is refused, so a rename cannot reach one: atlas-web has 21 routes and no pages.",
    },
    {
      statement: "Every route file is claimed by a page.",
      workingMemory:
        "186 files under routes/ across seven web apps and code-system, against 12 route pages. Split off the wider claiming because it waits on Alan rather than on reading: one route page type is shared, a slug is unique per page type, and so `home` cannot be written seven times. Alan is settling that separately, under uniquePropertySlug, which names the property a value is unique within. Resume once a route slug is unique within its app rather than across every app.",
    },
    {
      statement: "Every runtime helper the Lua compiler has is a page.",
      workingMemory:
        "lualib/src has 51 files against 115, lualibs 88 pages, 135 features, suite 50 of 50. lua50-code is proven on sparse-array-spread, the one page with both code files: the 5.0 bundle emits the Unpack body and the other eight table.unpack. Left are 12 plain moves, 25 whose own import is repointed, 8 non-leaves, 4 twins. Prove a move by hashing the removed source against the added code file in the commit, then nine-target byte-identity, then /var/tmp/imip/thea-behaviour.lua.",
    },
    {
      statement: "Every property file has the page whose property that file is.",
      workingMemory:
        "Ten of eleven settled. The eight ESO days from 2026-08-31 to 09-07 have pages again and their samples are claimed, Alan taking the writer itself separately. The two eso-daily-tracking strays are gone, every measurement in them already on its ESO day once floats and timestamps are normalised. Left is change-running.change-runner.addressed.ts, which no hand can remove: an apply drops any edit naming a change-runner addressed file, reading only the name. Filed as a finding.",
    },
    {
      statement: "Every checksum annotation a workload has derives from a secret its page names.",
      workingMemory:
        "Every workload carrying a checksum annotation now names its secrets, but buildkit and promtail, whose annotation tracks a ConfigMap the manifest emits rather than a secret. 8 secret pages were written for the 4 s3-creds resources that had none, placements only and no sops value. Left: the deploy fills the annotation. workload-deploying cannot, carrying the absence that nothing there reads a page, so the filling sits with web-app-reading, which already reads the cluster-service page.",
    },
    {
      statement: "Every env key a client bundle reads is marked for vite rather than for Next.",
      workingMemory:
        "Six commits: every client read takes import.meta.env.VITE_* now, the manifests hand each key under both names, and the iOS stage script supplies VITE_API_ORIGIN, the only supplier that key has anywhere. supabaseClientEnvDefine still inlines four process.env.NEXT_PUBLIC_* keys no client read uses, and throws unless two are set, so six vite builds require two dead variables. Dropping the Next names is held: seven route files with the build sha and the pmtiles url are claimed by no page.",
    },
    {
      statement: "A check looks for unused code and passes.",
      workingMemory:
        "The ast-unused audit is the finder that exists: 8 ast-unused-config pages, now under code-system/audit-ast-unused/ast-unused-configs/pages, name the entry globs each workspace family is read under. They were parked in the cluster-checks folder and came out before it went. Nothing in the tree resolves the curation path or runs the tool, so both what runs it and what it answers over the tree as it is are unmeasured. nimue-code-cleanup names it too.",
    },
    { statement: "No finding is filed on checks-system or any part beneath it." },
    { statement: "No gap invariant is written on checks-system or any part beneath it." },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
