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
  "  The cluster-check system under infra/cluster-checks/ no longer judges this",
  "  repository. These files are kept so their history can be read, and nothing",
  "  more. A pass from one of them certifies nothing and a failure from one of",
  "  them means nothing. Do not act on either.",
  "",
  "  The only valid checks are the akasha ones:",
  "",
  "    akasha audit          every check that runs at audit, over every file the",
  "                          akasha folder holds",
  "    akasha lint <path>    what the linter finds in the paths you name",
  "    akasha test <path>    the tests beside the code you name",
  "",
  "  Every rule that still holds is a page under akasha/checks/code-checks/pages/.",
  "  To bring back a rule one of these files carried, write it there as a code",
  "  check. Do not revive this one, and do not delete this refusal to run it.",
  "",
].join("\n")

export function refuseRetired(): never {
  process.stderr.write(`${SAID}\n`)
  // 2 is EXIT_TOOL_ERROR: this is not a clean run and not a violation count.
  process.exit(2)
}
