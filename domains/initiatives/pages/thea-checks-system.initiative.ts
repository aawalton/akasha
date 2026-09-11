import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

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
        "Every refusal outside no-rule-in-two-files is cleared. tests-pass judged 124539 files and refused none. no-rule-in-two-files reads 426 in 177 families, grouped by body: ruleOf canonicalises every bound name, so a family is never a coincidence of naming, and it omits the return type, which is the one way a family is two rules. 284 of the 426 are lone pairs, so sharing cannot reach zero and most want an absence. 111 are test scaffolding.",
    },
    {
      statement: "Every runtime helper the Lua compiler has is a page.",
      workingMemory:
        "lualib/src has 51 files against 115, lualibs 88 pages, 135 features, suite 50 of 50. lua50-code is proven on sparse-array-spread, the one page with both code files: the 5.0 bundle emits the Unpack body and the other eight table.unpack. Left are 12 plain moves, 25 whose own import is repointed, 8 non-leaves, 4 twins. Prove a move by hashing the removed source against the added code file in the commit, then nine-target byte-identity, then /var/tmp/imip/thea-behaviour.lua.",
    },
    {
      statement: "Every property file has the page whose property that file is.",
      workingMemory:
        "The last stray is gone and the mechanism holding it is mended. 78b39f745ee on 2026-09-08 replaced writtenAgain, which read only the path name, with writtenPathsIn, reading the change-runner pages the index holds, so edits for a map no runner page claims fold like any other. 9fc7dc6c58f then removed change-running.change-runner.addressed.ts and the finding naming it. Both addressed files left have their runner page. No test pins the orphan case, and the audit answering the intent is unrun.",
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
    {
      statement: "No finding is filed on checks-system or any part beneath it.",
      workingMemory:
        "31 findings name domain/check, second only to all-about-alan's 56, out of 272 in the tree. None has been read under this initiative. Each is either work to finish or a truth belonging on the page it concerns, and the constraint is that work a step turns up is finished rather than filed, so each of the 31 is done or deleted rather than re-filed.",
    },
    {
      statement: "No gap invariant is written on checks-system or any part beneath it.",
      workingMemory:
        "87 gaps on 49 pages under checks: 37 limits, 38 shortfalls, 12 plain behaviour. 23 limits sit on 15 pages carrying limits only, and 16 of the 27 syntax-rule gaps are limits whose test file settles them. repository-is-written-by-a-change keeps both voices apart on one page, so a limit wearing gap is mis-kinded rather than house style. Voice says which to read first, never the cure: of five sorted, two were bound elsewhere, two absences, one departure.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
