import { componentTestMissingDom } from "../component-dom-guard"

if (componentTestMissingDom(process.argv, typeof globalThis.document !== "undefined")) {
  throw new Error(
    [
      "Component test invoked without a DOM (document is not defined).",
      "",
      "`*.component.test.*` files require the happy-dom preload, and Bun reads",
      "bunfig.toml from the current directory only — so the preload applies only when",
      "`bun test` runs from a directory whose own bunfig.toml declares it. That is the",
      "workspace root, which is not always the nearest directory holding a package.json —",
      "a build-root marker can carry a package.json and no bunfig.toml.",
      "",
      "Run it from the nearest ancestor directory that has a bunfig.toml:",
      "  cd <that-dir> && bun test <path-relative-to-that-dir>",
      "",
      "or preload happy-dom explicitly from the root:",
      "  bun test --preload @shared/utils-test/setup/happydom <path>",
    ].join("\n")
  )
}
