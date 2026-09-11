import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aNarrowedParameterOnASharedInterfaceRefusesAtTheReceiver = {
  id: "01a061fa-c48f-7801-8b15-d717a2bcadd4",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-narrowed-parameter-on-a-shared-interface-refuses-at-the-receiver",
  domain: "domain/check",
  claim:
    "`CreateControl` is redeclared on the shared `Control` interface with a narrower parameter. A narrowed parameter fails contravariantly, so it surfaces as a missing property at the receiver rather than as a conflict where it is written, and the receivers are `CtControl` and `CtLabel`. Whether the diagnostics that raises are still open is unmeasured, because measuring it needs a typecheck over temper. Open beside it: the check after `no-global-in-a-module` has to refuse on whose type a member names and rank on what kind of member it is, because neither half alone catches all three shapes.",
  evidence:
    "`interface Control` at temper/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts:43 declares `CreateControl: <T extends Control = Control>(name: string, controlType: number) => T` on line 44, and that is the augmentation at issue. Two declarations restate the member with a narrower default: craft-decl-controls.type-declaration.d.ts:137 answers `InspirationContainer`, and eso-provisioner-station.type-declaration.d.ts:38 answers `LabelControl`. What `CtControl` and `CtLabel` declare, and how many diagnostics the augmentation raises today, are unread here; both need a typecheck rooted wide enough to reach temper-lib-custom-menu, and a harness rooting dependencies alone does not reach it. The rule deciding where a member belongs sits on code-system/type-declarations/type-declaration.page-type.ts and is not restated here.",
} as const satisfies Finding
