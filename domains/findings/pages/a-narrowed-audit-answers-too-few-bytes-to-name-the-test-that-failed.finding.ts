import type { Finding } from "../finding.page-type.types.ts"

export const aNarrowedAuditAnswersTooFewBytesToNameTheTestThatFailed = {
  id: "01a08312-ec47-7d49-9c3c-be3b8229dc3d",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-narrowed-audit-answers-too-few-bytes-to-name-the-test-that-failed",
  domain: "domain/check",
  claim:
    "A test failing only under a multi-file run cannot be diagnosed from `akasha audit`. The `tests-pass` check puts the whole run output in its refusal, as that check's page says it does, but the answer one audit call gives is capped far below that, and the refusal ends before the failing assertion. Sending the answer to a file does not help, because the cap is on the answer rather than on the terminal. `akasha audit` has no flag widening what it carries. An agent is told which file failed and how many tests failed in it, and is never told which test or why.",
  evidence:
    "Measured 2026-09-08. `akasha audit --check tests-pass --file-path changes --file-path command-system/change-running` refused on two of four runs, each time with the same one line: `changes/agent/file-content/add-property-record/add-property-record.change-agent.test.ts` said `1 of 1036 tests failed, over 114 test files standing beside what this change carries`, followed by `bun test v1.3.14 (0d9b296a)` and a run of progress dots that ends there. The other two runs of that same scope came back clean, as did `--file-path changes` on its own and the failing file on its own.\n\nThe whole answer sent to a file is 470 bytes. That is the cap rather than the terminal, and rather than the check: `tests-pass.code-check.ts` states `The whole output of the run is carried in the refusal.` and `reasonOf` in `tests-pass.code-check.decision.code.ts` ends every failing branch with `saidOf(ran.output)`, which drops blank lines and color and keeps the rest. The same page states `How much of a refusal one answer carries is settled where the apply answers.`, so the audit is one of the places settling it, and `akasha audit --help` names only `--check` and `--file-path`.\n\nWhat the cap hid here was worth reading. The six tests in that file build their world with `worldFor` from `change-shadow.module.test-fixtures.ts`, which answers a page, a body and a reach from memory and touches no file, no git and no scratch root, so nothing in them is ordered or timed. A pure test file that fails once in two runs and never alone is either the runner under load or a fault worth naming, and which one it is sits in the bytes the answer dropped.",
} as const satisfies Finding
