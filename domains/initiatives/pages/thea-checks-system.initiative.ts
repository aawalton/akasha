import type { Initiative } from "../initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "Every check is green.",
      workingMemory:
        "2614 refusals remain. 40 of the 53 checks that ran are green. A bare audit no longer finishes. The run is killed at the 300 second ceiling the audit command states, so tests-pass, typecheck and types-file-runs-nothing go unrun and no answer is printed. Two checks hold 53%: no-rule-in-two-files 1046, identifier-matches-its-place 340. A check refusing what no file can change is mended in the check rather than in the files. 414 such refusals are left. Take the worst files first.",
    },
    {
      statement: "Every codec version the tree reads is round-tripped by a test.",
      workingMemory:
        "No codec has a round trip test at any version. The tree reads character v48 and v52 and companion v48 and v49. Real hashes are recorded on the character build pages and every one of them is v52. A test file is held to 5 processor seconds.",
    },
    {
      statement: "The addons write the newest codec version.",
      workingMemory:
        "Both shipped addons write version 48. TemperCharacters.lua and TemperCompanions.lua each set ESO_VERSION to 48 and write it as 8 bits. The web app writes character v52 and companion v49. That constant is generated from codec-constants, so the move is a regeneration and a rebuild rather than an edit to the Lua. A build captured by the old addon stays v48 after the move.",
    },
    {
      statement: "Every codec version the tree holds has a writer.",
      workingMemory:
        "Character v49, v50 and v51 have no writer and no recorded hash. Taking them out clears about 135 no-rule-in-two-files refusals, as the equipment, skills and champion point files are byte-identical across v48 to v50 and across v51 to v52. Character v48 stays until the addon writes v52. Companion v48 and v49 both have a writer today.",
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
