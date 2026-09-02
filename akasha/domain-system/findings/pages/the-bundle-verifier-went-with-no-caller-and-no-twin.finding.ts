import type { Finding } from "../finding.page-type.ts"

export const theBundleVerifierWentWithNoCallerAndNoTwin = {
  id: "01a0637d-4e11-7c52-a713-2b8e0d64f9a7",
  pageTypeSlug: "finding",
  slug: "the-bundle-verifier-went-with-no-caller-and-no-twin",
  domainSlug: "domain/temper",
  claim:
    "`temper/addons/scripts/build/verify-addon-bundle.ts` went with the folder holding it. It read the addon archive and refused one whose members did not satisfy every `DependsOn` line the manifests declare, and it carried its own negative control. Nothing in the repository called it, and akasha holds no twin of it.",
  evidence:
    '145 lines. A census over every tracked file for the strings `verify-addon-bundle` and `verifyAddonBundle` found one hit, the usage text inside the file itself, so it had no caller in any script, workflow, page or command.\n\nWhat it did that nothing else does: extracted the archive, read every `##DependsOn:` and `##OptionalDependsOn:` line out of the extracted manifests, and refused where a named addon was neither in the archive nor in the allow list, which held `TamrielTradeCentre` alone.\n\nThe directive left behind is in its own usage text against `--drop <Name>`: "Negative control: the run MUST fail. A check that passes with a required member missing is not evidence." That is the shape the akasha bundle gates want and do not have — the finding `the-bundle-gates-count-whatever-the-build-managed-to-write` records the same gap from the other side.',
} as const satisfies Finding
