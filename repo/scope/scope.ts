import type { Repo } from "../../page/document/types.ts"

export const CHECK_EXEMPT_DIRS: ReadonlySet<string> = new Set(["__fixtures__", "generated"])

export const CODE_REPO: Repo = "code"

export const INSTRUCTIONS_REPO: Repo = "instructions"
