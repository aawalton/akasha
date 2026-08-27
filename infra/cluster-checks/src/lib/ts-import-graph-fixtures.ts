import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import ts from "typescript"

export function sf(text: string, name = "t.ts"): ts.SourceFile {
  return ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true)
}

export interface FixtureSpec {
  files: Record<string, string>
  knip: unknown
}

export function writeFixture(spec: FixtureSpec): {
  repoRoot: string
  cleanup: () => void
} {
  const root = mkdtempSync(join(tmpdir(), "ast-unused-fixture-"))
  for (const [rel, content] of Object.entries(spec.files)) {
    const abs = join(root, rel)
    mkdirSync(abs.substring(0, abs.lastIndexOf("/")), { recursive: true })
    writeFileSync(abs, content)
  }
  writeFileSync(join(root, "knip.json"), JSON.stringify(spec.knip, null, 2))
  execFileSync("git", ["-C", root, "init", "-q", "-b", "main"], { stdio: "ignore" })
  execFileSync("git", ["-C", root, "config", "user.email", "test@test.test"], { stdio: "ignore" })
  execFileSync("git", ["-C", root, "config", "user.name", "Test"], { stdio: "ignore" })
  execFileSync("git", ["-C", root, "config", "commit.gpgsign", "false"], { stdio: "ignore" })
  execFileSync("git", ["-C", root, "add", "."], { stdio: "ignore" })
  execFileSync("git", ["-C", root, "commit", "-q", "-m", "init"], { stdio: "ignore" })
  return { repoRoot: root, cleanup: () => rmSync(root, { recursive: true, force: true }) }
}

export const BASE_TSCONFIG = JSON.stringify({
  compilerOptions: {
    target: "ES2022",
    module: "ESNext",
    moduleResolution: "bundler",
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    allowImportingTsExtensions: false,
    noEmit: true,
  },
  include: ["**/*.ts"],
})
