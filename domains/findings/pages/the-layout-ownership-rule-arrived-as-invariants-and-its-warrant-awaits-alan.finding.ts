import type { Finding } from "../finding.page-type.ts"

export const theLayoutOwnershipRuleArrivedAsInvariantsAndItsWarrantAwaitsAlan = {
  id: "01a0675c-b782-7128-85d9-0ed99531985d",
  pageTypeSlug: "finding",
  slug: "the-layout-ownership-rule-arrived-as-invariants-and-its-warrant-awaits-alan",
  domainSlug: "page-type/finding",
  claim:
    "The `design-system` domain page in `pages/domain` carried one directive, Layout Ownership, that no page inside akasha held. Its act and both its aids landed as three invariants on `akasha/design/system/design-system.workspace-package.ts`, so nothing is lost, but a directive binds every reader and needs Alan's approval. Whether Layout Ownership belongs back as a directive rather than as three invariants is his call.",
  evidence:
    "The directive as it read on 2026-09-03 in `pages/domain/design-system.domain.md`. Name: Layout Ownership. Act: `Write what separates a component from its neighbours on the parent, never on the component.` Warrant: `A component cannot see its neighbours, and a gap on the parent survives them coming and going.` Aids: `Never add a prop that lets a caller space it.` and `Keep the space inside a component on it.` I carried the act as `What separates a component from its neighbours is written on the parent, not the component.`, the first aid as the absence `No component takes a prop letting its caller space it.`, and the second as `The space inside a component is written on the component.` The warrant did not arrive, because an invariant states what is true rather than why. `akasha/design/design.domain.ts` already carries eight directives about layout and none of them says where the separating space is written, so this is no duplicate.",
} as const satisfies Finding
