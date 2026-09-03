// Running a retired cluster check refuses and exits. Every retired check calls
// `refuseRetired()` under `import.meta.main`, so running one says why rather than
// producing a result.
//
// The refusal is a call, not an import side effect. Seventeen of the retired
// checks also export scanners that live code imports, and a module that exits
// while being imported ends whatever imported it with nothing said — no stack, no
// name, no way to catch it. Refusing at call time keeps the guard and costs no
// reader their run.

const SAID = [
  "",
  "  REFUSED: this is a retired cluster check. It is NOT to be run.",
  "",
  "  Nothing dispatches a cluster check. These stand as pages under",
  "  akasha/checks/cluster-checks/pages/, and 35 of the 43 held here declare the",
  "  node kinds that would wake them, but the road that read those declarations",
  "  was the CI pipeline family, and that has not run since 2026-08-25. A check",
  "  no road wakes judges nothing, whatever it prints when run by hand.",
  "",
  "  So a pass from one of these certifies nothing and a failure from one of them",
  "  means nothing. Do not act on either. Their subjects moved under them during",
  "  the migration as well: 15 of the 43 answer a run by naming a tree that is no",
  "  longer where they look.",
  "",
  "  This refusal states a policy rather than an incapacity. Measured 2026-09-03",
  "  by running all 46 with this call stubbed out: 18 of the 43 still gave a real",
  "  pass or fail over this tree. They can run. They are held because no road",
  "  wakes them.",
  "",
  "  The checks that do judge this repository are the akasha ones:",
  "",
  "    akasha audit          every check that runs at audit, over every file the",
  "                          akasha folder holds",
  "    akasha lint <path>    what the linter finds in the paths you name",
  "    akasha test <path>    the tests beside the code you name",
  "",
  "  This refusal is not a redirection. Not one rule held here stands as a code",
  "  check: the names under akasha/checks/code-checks/pages/ and the names here do",
  "  not overlap at all. To bring a rule here back, either give it a road that",
  "  dispatches it, or write it under code-checks and take this one away. Do not",
  "  revive this one in place, and do not delete this refusal to run it.",
  "",
].join("\n")

export function refuseRetired(): never {
  process.stderr.write(`${SAID}\n`)
  // 2 is EXIT_TOOL_ERROR: this is not a clean run and not a violation count.
  process.exit(2)
}
