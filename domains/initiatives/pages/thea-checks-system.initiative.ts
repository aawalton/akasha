import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "workspace-package/check",
  personaSlug: "thea",
  intents: [
    {
      statement: "The new system has every check of the old system that still applies.",
      workingMemory:
        "No cluster-check is left. The last, checksum-annotation-substitution, went rather than ported: workload-deploying already refuses a checksum/* value that is not a 32-to-64 hex digest, before anything is applied, catching all 13 placeholder spellings the tree writes. The old check looked instead for a sed site elsewhere in the same package, and no sed site is left anywhere. 36 orphan modules are left under cluster-checks, their sweep still unanswered.",
    },
    { statement: "The old system has no check of its own." },
    { statement: "No finding is filed on checks-system or any part beneath it." },
    { statement: "No gap invariant is written on checks-system or any part beneath it." },
    {
      statement: "Every page property is in a properties folder for the page type defining it.",
      workingMemory:
        "Found while making the parts a spanning tree: the folder with a property's file and the page type introducing that property disagree in real cases. `category-slug` sits under `monarch-months` while `category-rule` introduces the property; `effect-type` and `metric-id` sit under `temper-catalog-things` while `temper-companion-trait` introduces both. `introduced-property-is-a-part` judges the declaration and says outright that the folder is not judged. No check judges the folder.",
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
      statement: "Every cluster-check module body is claimed by a page.",
      workingMemory:
        "Three left: cli-args, repo-root and tree-reading. No page can be written for any, a slug being unique within its page type and each of those three slugs already held by a module page elsewhere. They wait on the same uniquePropertySlug call as the routes.",
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
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
