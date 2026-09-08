const SAID = [
  "",
  "  REFUSED: this is a retired cluster check. It is NOT to be run.",
  "",
  "  Nothing dispatches a cluster check. These stand as pages under",
  "  checks/cluster-checks/pages/, and 35 of the 43 held here declare the",
  "  node kinds that would wake them, but the road that read those declarations",
  "  was the CI pipeline family, and that has not run since 2026-08-25. A check",
  "  no road wakes judges nothing, whatever it prints when run by hand.",
  "",
  "  So a pass from one of these certifies nothing and a failure from one of them",
  "  means nothing. Do not act on either. Their subjects moved under them during",
  "  the migration as well: run with the refusal lifted, 8 of the 43 name a tree",
  "  that is no longer where they look, and 4 more report a population that came",
  "  back empty or short rather than a verdict.",
  "",
  "  This refusal states a policy rather than an incapacity. Measured 2026-09-03",
  "  by running all 46 with this call stubbed out: 18 of the 43 still gave a real",
  "  pass or fail over this tree. They can run. They are held because no road",
  "  wakes them.",
  "",
  "  The checks that do judge this repository run at a change. The tests, the",
  "  typecheck and the linter run over what `akasha change` writes, and run again",
  "  over what `akasha apply` lands.",
  "",
  "  This refusal is not a redirection. Not one rule held here stands as a code",
  "  check: the names under checks/code-checks/pages/ and the names here do",
  "  not overlap at all. To bring a rule here back, either give it a road that",
  "  dispatches it, or write it under code-checks and take this one away. Do not",
  "  revive this one in place, and do not delete this refusal to run it.",
  "",
].join("\n")

export function refuseRetired(): never {
  process.stderr.write(`${SAID}\n`)
  process.exit(2)
}
