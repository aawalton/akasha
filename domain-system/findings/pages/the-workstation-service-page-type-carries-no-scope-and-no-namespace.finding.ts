import type { Finding } from "../finding.page-type.ts"

export const theWorkstationServicePageTypeCarriesNoScopeAndNoNamespace = {
  id: "01a0683c-3c7f-7cbd-8082-f68bd747cdd3",
  pageTypeSlug: "finding",
  slug: "the-workstation-service-page-type-carries-no-scope-and-no-namespace",
  domainSlug: "domain/akasha-migration",
  claim:
    "The old workstation-service page type declared `scope`, being user or system, and `namespace`; the akasha page type declares neither, and the installer is user-scoped with no way to say otherwise. Their two page-property-definition files were left standing where the other twenty-one were taken away, because nothing inside akasha holds what they say.",
  evidence:
    "Measured 2026-09-03 11:0x MDT.\n\nWHAT WAS LEFT. pages/page-property-definition/workstation-service-scope.page-property-definition.md declares key `scope`, type select(lower-kebab-case), values user and system. pages/page-property-definition/workstation-service-namespace.page-property-definition.md declares key `namespace`, type text. Neither has a counterpart under akasha/service-system/workstation-services/properties/, so neither met the per-file match the twenty-one others met and neither was ablated.\n\nWHY SCOPE IS REAL. akasha/service-system/workstation-services/service-installing/service-installing.module.code.ts:22-23 fixes the unit folders at ~/.local/state/workstation-services and ~/.config/systemd/user, and systemctl at :110 is always called with `--user`. Every one of the thirty-one services carried in is a user unit, so nothing is currently wrong; there is simply no way for a page to ask for a system unit.\n\nWHY NAMESPACE LOOKS VESTIGIAL. None of the thirty-one markdown pages carried a `namespace` value, and namespace already stands as a cluster-service property at akasha/service-system/cluster-services/properties/namespace.text-property.ts, where it belongs.\n\nThe two files are a gap held open on purpose rather than work left undone.",
} as const satisfies Finding
