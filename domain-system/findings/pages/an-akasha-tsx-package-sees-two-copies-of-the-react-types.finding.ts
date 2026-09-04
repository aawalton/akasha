import type { Finding } from "../finding.page-type.ts"

export const anAkashaTsxPackageSeesTwoCopiesOfTheReactTypes = {
  id: "01a05b91-37b0-7438-bdce-9f5aa9568a05",
  pageTypeSlug: "finding",
  slug: "an-akasha-tsx-package-sees-two-copies-of-the-react-types",
  domainSlug: "domain/akasha-check",
  claim:
    "An akasha package names no devDependencies, since manifest-names-what-is-reached refuses what it cannot see reached, so bun links no node_modules beside it. Its TSX then resolves @types/react at the root real directory while every shared package resolves the same version through its own symlink into .bun. TypeScript keys declarations by resolved path, so the two are unrelated, and an akasha file spreading ref-bearing props into a shared component is refused.",
  evidence:
    "Landing design-forms, three sites were refused TS2322 'Two different types with this name exist, but they are unrelated', each on the ref in a spread: form.module.code.tsx:85 into design-primitives Label, input-group.module.code.tsx:114 into Input and :127 into Textarea. Both copies are @types/react 19.2.18 and node_modules/@types/react/index.d.ts shares inode 187236316 with node_modules/.bun/@types+react@19.2.18/node_modules/@types/react/index.d.ts, so the content is identical and only the resolved path differs. shared/design-primitives, design-patterns, design-system, pages-ui, design-forms and alanwalton/web each hold node_modules/@types/react as a symlink to ../../../../node_modules/.bun/@types+react@19.2.18/node_modules/@types/react; akasha/design/design-badges and akasha/design/design-forms hold no node_modules at all. design-badges escaped only because no badge spreads intrinsic element props into a design-primitives component. The lane's workaround was to type each wrapper by the component it wraps, React.ComponentProps<typeof Input> rather than React.ComponentProps<'input'>, which is truer anyway and drops one radix import; it does not generalise, since a package holding many such wrappers would need every one rewritten. The finding this was a second consequence of, that the manifest check reads no `.tsx`, was removed at `e1c441febe` once the check was widened; the akasha design packages still name no devDependencies and hold no `node_modules`.",
} as const satisfies Finding
