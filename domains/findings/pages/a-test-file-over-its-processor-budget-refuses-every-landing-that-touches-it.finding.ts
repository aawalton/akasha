import type { Finding } from "../finding.page-type.types.ts"

export const aTestFileOverItsProcessorBudgetRefusesEveryLandingThatTouchesIt = {
  id: "01a087c3-ceb6-78f9-93bb-3e8bf78c5029",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-test-file-over-its-processor-budget-refuses-every-landing-that-touches-it",
  domain: "domain/testing-system",
  claim:
    "A test file already over its processor budget refuses every landing that touches it, so the file cannot be mended by the landing that would mend it. The budget is read only when a landing carries that file, so a file drifts over the budget with nothing saying so until someone is barred. The refusal names the file rather than the debt, so whoever arrives next reads the cost as their own and shortens what they wrote.",
  evidence:
    "`rename-code-token.change-agent.test.ts` spends 5.3 processor seconds against a budget of 5, judged by `tests-pass` over the tree with nothing drafted. Three landings that shortened the file were each refused, one of them measuring 5.2. The cost is structural: eighteen of its tests build a whole TypeScript program, because the change under test builds one before any guard of its own is consulted. The audit does not read this budget, so nothing finds such a file until a landing touches it.",
} as const satisfies Finding
