import type { Finding } from "../finding.page-type.ts"

export const theAddOnBuildChecksCannotLandAsCodeChecks = {
  id: "01a06291-b403-705d-b392-34e6a449bbff",
  pageTypeSlug: "finding",
  slug: "the-add-on-build-checks-cannot-land-as-code-checks",
  domainSlug: "domain/temper",
  claim:
    "The checks in `temper/shared-build-deploy-checks` look like `code-check` pages and cannot be them. `code-check.page-type.ts` carries the directive Alan Approves Checks. And `checks.workspace-package.ts` states checks reach no further than the akasha folder, while these read the game add-on tree. They land as plain modules.",
  evidence:
    "Read 2026-09-02 at HEAD 919be4c20a, deciding where `temper/shared-build-deploy-checks` goes.\n\nThe resemblance is close enough to mislead. The package holds pairs — `addon-sandbox-load.ts` beside `check-addon-sandbox-load.ts`, and so on for sixteen more — which is the shape `akasha/checks/code-checks/pages/<slug>/` already keeps as `<slug>.code-check.code.ts` beside `<slug>.code-check.ts`. Forty-four code-check pages are landed in that shape.\n\nThe first bar is `code-check.page-type.ts:157-169`: the directive Alan Approves Checks, whose act is 'Add a check to akasha only where Alan has approved that check', with the aid 'Approving the initiative is not approving a check'. Recreating these as code-check pages is adding twenty checks, so it needs twenty approvals rather than none.\n\nThe second bar is independent of the first and is not about approval at all. `checks.workspace-package.ts:22-32` states 'Checks reach no further than the akasha folder', 'A path outside the akasha folder is passed over rather than refused', and 'Every check is handed the change narrowed to the akasha folder before the check runs'. These checks read `temper/addons/dist`, addon manifests and Lua bundles, none of which is under `akasha/`. A code-check handed a change narrowed to `akasha/` would be handed nothing every time and would report clean, which is the failure mode the package's own population note exists to catch.\n\nSo they land under `akasha/temper/temper-build-deploy-checks` as `module` pages; the first seven are at a1b04a5aaa. Whether akasha wants a check type that reads outside itself is Alan's question.",
} as const satisfies Finding
