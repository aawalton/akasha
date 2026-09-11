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
        "no-rule-in-two-files is the only check refusing: about 345 in 144 families. Folding rather than narrowing is the route, since one-literal bodies that cannot drift are only 14. It runs at audit only; at change it re-parses all 82k ts files for 6.4s, 5.4x the whole 48-check suite, so nothing stops the count rising, and the mend is filing the rule map beside the index. It reads a free name as written, so 7 of 150 families have a leg it cannot see.",
    },
    {
      statement: "Every checksum annotation a workload has derives from a secret its page names.",
      workingMemory:
        "16 annotations on 12 workloads, 11 secret-derived: 10 agree with the page, 0 derive. Every manifest hardcodes the secret name and keys and reads no page, so agreement is hand-kept and headscale's checksum/tls already mismatches, over a Secret cert-manager issues. The filling is done: secretChecksum shells to kubectl inside planFor and throws without a cluster. Deriving sits with workload-applying, not web-app-reading, which reaches no cluster. 10 of 26 named secret resources are annotated.",
    },
    {
      statement: "A check looks for unused code and passes.",
      workingMemory:
        "Verified 2026-09-10, and the premise was wrong. The finder is deleted rather than unwired: 8ead8507d0a took out its 568 lines, and 8392949e28 dropped it as a check because an instrument stating a population refuses nothing. Its target, the code repo, tracks zero files at HEAD. The 8 curation pages name 25 workspaces, of which 8 have no directory and 6 are packages. nimue-code-cleanup does not name it. Reaching this intent is a rebuild Alan approves.",
    },
    {
      statement: "No finding is filed on checks-system or any part beneath it.",
      workingMemory:
        "16 findings sit in the checks subtree, not 31; all 19 parts of check.domain.ts were walked, so that is the whole set. Three were parked behind a bar that is not there: Alan Approves Checks says widening an approved check needs none. Five have had their mechanism carried onto a page, and each shortfall left may not move without breaching intent 8. an-install-that-never-prunes claims 41 importing files; a parse-position scan over 123907 tracked files finds none, so that half of it is false.",
    },
    {
      statement: "No gap invariant is written on checks-system or any part beneath it.",
      workingMemory:
        "66 gaps on 39 pages, not 87 on 49; a 67th is a fixture string. 8 sit on three experimental checks, out of scope, so 58 are in play. 26 landed: 21 re-kinded, 5 deleted; 67 gaps to 41 by grep. A limit wearing gap is mis-kinded, proven twice: repository-is-written-by-a-change and check-cost each set honest absences beside shortfall gaps in one hand. no-code-comments cannot read its forms from the list: a member holds a name and a gloss, no pattern.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
