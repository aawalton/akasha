import type { Finding } from "../finding.page-type.ts"

export const aComponentThatDrawsNothingCannotBeWritten = {
  id: "01a05c94-17cd-7636-be8b-f445b9f354e8",
  pageTypeSlug: "finding",
  slug: "a-component-that-draws-nothing-cannot-be-written",
  domainSlug: "domain/harness",
  claim:
    "A React component that installs an effect and draws nothing cannot land. `identifier-matches-its-place` reads a function as a component only where its body holds JSX, so one returning `null` is held to a lower-camel name, and JSX reads a lower-camel name as a DOM tag rather than a component. Biome's `noUselessFragments` then refuses `return <></>`, the only JSX such a component can hold. Each gate is right alone, and between them the component cannot be written.",
  evidence:
    "Met moving `shared/errors-client` into akasha. `ErrorCaptureInstaller` installs `window.onerror` and an `unhandledrejection` listener in a `useEffect` and returns `null`. Seven site roots draw it as `<ErrorCaptureInstaller app=\"...\" />`.\n\nWriting `return <></>` satisfied the akasha check — `drawing` in `identifier-matches-its-place` looks for `ts.isJsxFragment` among others — and was then refused by `lint/complexity/noUselessFragments` at that exact line. A fragment holding one child is refused on the same rule, and this component has no children to draw.\n\nTurning it into a hook is not free. Its effect runs today as a child of each site's `Layout`, so it installs before the parent's effects; called as a hook in `Layout` it would install after every child had mounted, and an error thrown in a child's mount effect would go unreported. That is a behaviour change rather than a rename.\n\nThe package's three JSX-free modules landed checked at `08d83bc7a3` and the component was held back. What would close this is `drawing` reading an exported function whose return type is `null` or `ReactNode` as a component, since that is the shape React gives a component that draws nothing.",
} as const satisfies Finding
