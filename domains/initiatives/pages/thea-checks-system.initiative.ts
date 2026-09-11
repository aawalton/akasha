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
        "no-rule-in-two-files reads 404 in 169 families, grouped by body: ruleOf canonicalises every bound name, and omits the return type, which is the one way a family is two rules. 284 of 426 were lone pairs wanting an absence rather than a module. But an absence leaves both files refused, which the check states itself, so this check reaches zero only by sharing bodies that should not be shared. Narrowing it to honour an absence is Alan's.",
    },
    {
      statement: "Every runtime helper the Lua compiler has is a page.",
      workingMemory:
        "lualib/src is gone: 135 pages, 135 features, all 51 files moved in 13 commits on 09-10. Those broke the Lua 5.0 bundle, which 0dbb243e460 mends: a 5.0 build resolves an import of a twin page's code to that page's lua50-code, derived from the pages. Nine targets build where eight did, the eight byte-identical, 5.0 proved by `local function __TS__Unpack(list, i, j)` rather than by no error. No test anywhere calls buildLuaLib, so 13 commits landed green over a broken build.",
    },
    {
      statement: "Every property file has the page whose property that file is.",
      workingMemory:
        "The addressed stray is gone and the mechanism holding it mended: 78b39f745ee replaced writtenAgain, which read only the path name, with writtenPathsIn, reading the change-runner pages the index holds. Both addressed files left have their runner page, and no test pins the orphan case. file-has-its-page judges 124582 files and refuses 9, every one a property file its page's deletion left behind: seven subagent edit files, two seat files. One mechanism rather than nine strays.",
    },
    {
      statement: "Every checksum annotation a workload has derives from a secret its page names.",
      workingMemory:
        "Every workload carrying a checksum annotation now names its secrets, but buildkit and promtail, whose annotation tracks a ConfigMap the manifest emits rather than a secret. 8 secret pages were written for the 4 s3-creds resources that had none, placements only and no sops value. Left: the deploy fills the annotation. workload-deploying cannot, carrying the absence that nothing there reads a page, so the filling sits with web-app-reading, which already reads the cluster-service page.",
    },
    {
      statement: "Every env key a client bundle reads is marked for vite rather than for Next.",
      workingMemory:
        "Verified 2026-09-10. The four NEXT_PUBLIC inlines in supabaseClientEnvDefine are dead in first-party code and in node_modules, against a control finding 23 live import.meta.env.VITE_* reads; every supplier sets both spellings. The throw is not dead: it is the only build-time check that five of six builds have their Supabase settings, and catches that only because both spellings travel together. web-capacitor guards the VITE names at stage-app 25-30. Re-point the throw rather than drop it.",
    },
    {
      statement: "A check looks for unused code and passes.",
      workingMemory:
        "Verified 2026-09-10, and the premise was wrong. The finder is deleted rather than unwired: 8ead8507d0a took out its 568 lines, and 8392949e28 dropped it as a check because an instrument stating a population refuses nothing. Its target, the code repo, tracks zero files at HEAD. The 8 curation pages name 25 workspaces, of which 8 have no directory and 6 are packages. nimue-code-cleanup does not name it. Reaching this intent is a rebuild Alan approves.",
    },
    {
      statement: "No finding is filed on checks-system or any part beneath it.",
      workingMemory:
        "31 findings name domain/check, second only to all-about-alan's 56, out of 272 in the tree. None has been read under this initiative. Each is either work to finish or a truth belonging on the page it concerns, and the constraint is that work a step turns up is finished rather than filed, so each of the 31 is done or deleted rather than re-filed.",
    },
    {
      statement: "No gap invariant is written on checks-system or any part beneath it.",
      workingMemory:
        "87 gaps on 49 pages under checks: 37 limits, 38 shortfalls, 12 plain behaviour. A limit wearing gap is mis-kinded rather than house style, repository-is-written-by-a-change keeping both voices apart on one page. Of 31 sorted so far, 4 were genuine. Voice says which to read first and never the cure, and a test naming the behaviour settles nothing either: no-void-return's test for a void parameter declares one typed number, and exercises nothing.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
