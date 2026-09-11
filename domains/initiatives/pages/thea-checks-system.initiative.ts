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
        "no-rule-in-two-files groups by body: ruleOf canonicalises parameters and plain locals, not destructured names, and omits the return type. The count moves hourly, so measure rather than trust a written one. Two thirds are lone pairs, and how many of those genuinely want an absence is unjudged. An absence leaves both files refused, which the check states itself and twelve landed absences bore out, so some pairs cannot clear. Narrowing it to honour an absence is Alan's.",
    },
    {
      statement: "Every runtime helper the Lua compiler has is a page.",
      workingMemory:
        "lualib/src is gone: 135 pages, 135 features, all 51 files moved in 13 commits on 09-10. Those broke the Lua 5.0 bundle, which 0dbb243e460 mends: a 5.0 build resolves an import of a twin page's code to that page's lua50-code, derived from the pages. Nine targets build where eight did, the eight byte-identical, 5.0 proved by `local function __TS__Unpack(list, i, j)` rather than by no error. No test anywhere calls buildLuaLib, so 13 commits landed green over a broken build.",
    },
    {
      statement: "Every property file has the page whose property that file is.",
      workingMemory:
        "file-has-its-page refuses 0 of 124582, and the nine were two mechanisms rather than one. Seven were subagent edits files left by seat-restart sweeps before 3643bc5da5c had a take-down take a page's claimed files; the four sweeps since left nothing. No page remained to reach them through and the paths they named are gone. Two were seat sidecars stranded by the move into per-seat folders at 7fc1be118b8, each beside a live copy in its folder. A gitignored file's removal leaves no commit to say why.",
    },
    {
      statement: "Every checksum annotation a workload has derives from a secret its page names.",
      workingMemory:
        "16 annotations on 12 workloads, 11 secret-derived: 10 agree with the page, 0 derive. Every manifest hardcodes the secret name and keys and reads no page, so agreement is hand-kept and headscale's checksum/tls already mismatches, over a Secret cert-manager issues. The filling is done: secretChecksum shells to kubectl inside planFor and throws without a cluster. Deriving sits with workload-applying, not web-app-reading, which reaches no cluster. 10 of 26 named secret resources are annotated.",
    },
    {
      statement: "Every env key a client bundle reads is marked for vite rather than for Next.",
      workingMemory:
        "Met. No client bundle reads any NEXT_PUBLIC_* key. Every literal process.env.NEXT_PUBLIC_* read left is server-side: both pmtiles reads sit inside loaders, and the build sha is read by five api-live-version routes. node_modules holds none, and no import.meta.env.NEXT_PUBLIC or bracketed spelling exists anywhere. Control: 23 live import.meta.env.VITE_* reads. a67d239f234 re-pointed the guard onto the VITE names, 4f084ddedb dropped the four dead defines. No vite build was run by anyone.",
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
