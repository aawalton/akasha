import { describe, expect, test } from "bun:test"
import { fixture, landed, rootsAt } from "./fixture.ts"
import { type Moves, runtimeReading, surveyRename } from "./repoint.ts"

function moves(...pairs: readonly (readonly [string, string])[]): Moves {
  return new Map(pairs)
}

const READER = 'import { readFileSync } from "node:fs"\n'

describe("a path a module writes against its own directory", () => {
  test("follows the file it names when that file moves and the module stays put", () => {
    const at = fixture()
    try {
      at.put("tools/eso/opt-in.manifest.json", "{}\n")
      at.put(
        "tools/eso/opt-in.ts",
        `${READER}const P = new URL("./opt-in.manifest.json", import.meta.url).pathname\n`
      )
      const pairs = moves(["tools/eso/opt-in.manifest.json", "tools/eso/data/opt-in.manifest.json"])
      const body = landed(at.root, pairs, "tools/eso/opt-in.ts")
      expect(body).toContain('new URL("./data/opt-in.manifest.json", import.meta.url)')
    } finally {
      at.dispose()
    }
  })

  test("is re-anchored to the directory the module lands in when the module is what moves", () => {
    const at = fixture()
    try {
      at.put("tools/eso/opt-in.manifest.json", "{}\n")
      at.put(
        "tools/eso/opt-in.ts",
        `${READER}const P = new URL("./opt-in.manifest.json", import.meta.url).pathname\n`
      )
      const pairs = moves(["tools/eso/opt-in.ts", "tools/opt-in.ts"])
      const body = landed(at.root, pairs, "tools/opt-in.ts")
      expect(body).toContain('new URL("./eso/opt-in.manifest.json", import.meta.url)')
    } finally {
      at.dispose()
    }
  })

  test("is worked out again where the module and the file it names both move", () => {
    const at = fixture()
    try {
      at.put("tools/eso/opt-in.manifest.json", "{}\n")
      at.put(
        "tools/eso/opt-in.ts",
        `${READER}const P = new URL("./opt-in.manifest.json", import.meta.url).pathname\n`
      )
      const pairs = moves(
        ["tools/eso/opt-in.ts", "tools/deep/opt-in.ts"],
        ["tools/eso/opt-in.manifest.json", "tools/eso/data/opt-in.manifest.json"]
      )
      const body = landed(at.root, pairs, "tools/deep/opt-in.ts")
      expect(body).toContain('new URL("../eso/data/opt-in.manifest.json", import.meta.url)')
    } finally {
      at.dispose()
    }
  })

  test("follows the file it names when written as the static tail of a template", () => {
    const at = fixture()
    try {
      at.put("tools/ops/cli.ts", "export const cli = 1\n")
      at.put(
        "tools/tests/run.ts",
        "const CLI = `${import.meta.dir}/../ops/cli.ts`\nexport const c = CLI\n"
      )
      const pairs = moves(["tools/ops/cli.ts", "tools/ops/entry.ts"])
      const body = landed(at.root, pairs, "tools/tests/run.ts")
      expect(body).toContain("`${import.meta.dir}/../ops/entry.ts`")
    } finally {
      at.dispose()
    }
  })

  test("follows it where the template tail runs on past the path into an argument", () => {
    const at = fixture()
    try {
      at.put("tools/ops/cli.ts", "export const cli = 1\n")
      at.put(
        "tools/tests/run.ts",
        "const CMD = `${import.meta.dir}/../ops/cli.ts --help`\nexport const c = CMD\n"
      )
      const pairs = moves(["tools/ops/cli.ts", "tools/ops/entry.ts"])
      const body = landed(at.root, pairs, "tools/tests/run.ts")
      expect(body).toContain("`${import.meta.dir}/../ops/entry.ts --help`")
    } finally {
      at.dispose()
    }
  })

  test("follows it where the literal is handed to `join` beside the base", () => {
    const at = fixture()
    try {
      at.put("tools/tests/fixtures/one.json", "{}\n")
      at.put(
        "tools/tests/run.ts",
        'import { join } from "node:path"\nconst P = join(import.meta.dir, "fixtures/one.json")\nexport const p = P\n'
      )
      const pairs = moves(["tools/tests/fixtures/one.json", "tools/tests/data/one.json"])
      const body = landed(at.root, pairs, "tools/tests/run.ts")
      expect(body).toContain('join(import.meta.dir, "data/one.json")')
    } finally {
      at.dispose()
    }
  })

  test("becomes the one literal it stood for where the segments were written apart", () => {
    const at = fixture()
    try {
      at.put("pages/x.md", "# X\n")
      at.put(
        "tools/tests/run.ts",
        'import { resolve } from "node:path"\nconst P = resolve(import.meta.dir, "..", "..", "pages", "x.md")\nexport const p = P\n'
      )
      const pairs = moves(["pages/x.md", "pages/domain/x.md"])
      const body = landed(at.root, pairs, "tools/tests/run.ts")
      expect(body).toContain('resolve(import.meta.dir, "../../pages/domain/x.md")')
    } finally {
      at.dispose()
    }
  })

  test("is left alone where it names a directory the call never moves", () => {
    const at = fixture()
    try {
      at.put("tools/ops/cli.ts", "export const cli = 1\n")
      at.put(
        "tools/tests/run.ts",
        'import { resolve } from "node:path"\nconst ROOT = resolve(import.meta.dir, "..", "..")\nexport const r = ROOT\n'
      )
      const pairs = moves(["tools/ops/cli.ts", "tools/ops/entry.ts"])
      expect(landed(at.root, pairs, "tools/tests/run.ts")).toBeNull()
    } finally {
      at.dispose()
    }
  })

  test("is read as code only, a comment and a quoted name and a pattern naming none", () => {
    const at = fixture()
    try {
      at.put("tools/tests/a.json", "{}\n")
      at.put(
        "tools/tests/run.ts",
        'import { join } from "node:path"\n' +
          '// join(import.meta.dir, "a.json")\n' +
          'const NAMED = "import.meta.dir"\n' +
          "const RE = /[\"']/\n" +
          'const P = join(import.meta.dir, "a.json")\n' +
          "export const p = [NAMED, RE, P]\n"
      )
      const pairs = moves(["tools/tests/a.json", "tools/tests/z.json"])
      const body = landed(at.root, pairs, "tools/tests/run.ts")
      expect(body).toContain('// join(import.meta.dir, "a.json")')
      expect(body).toContain('const NAMED = "import.meta.dir"')
      expect(body).toContain('const P = join(import.meta.dir, "z.json")')
    } finally {
      at.dispose()
    }
  })

  test("is never read off a string that merely looks like one, standing beside no base", () => {
    const at = fixture()
    try {
      at.put("tools/eso/opt-in.manifest.json", "{}\n")
      at.put("tools/eso/opt-in.ts", 'const P = "./opt-in.manifest.json"\nexport const p = P\n')
      const pairs = moves(["tools/eso/opt-in.manifest.json", "tools/eso/data/opt-in.manifest.json"])
      expect(landed(at.root, pairs, "tools/eso/opt-in.ts")).toBeNull()
    } finally {
      at.dispose()
    }
  })
})

describe("what a rename does with a runtime path it cannot read", () => {
  test("refuses the move where the call takes a file out from under the base it hangs off", () => {
    const at = fixture()
    try {
      at.put("tools/lib/one.ts", "export const one = 1\n")
      at.put(
        "tools/lib/load.ts",
        'import { resolve } from "node:path"\nconst directory = import.meta.dir\nexport const load = (file: string) => import(resolve(directory, file))\n'
      )
      const pairs = moves(["tools/lib/one.ts", "tools/lib/deep/one.ts"])
      const { runtime } = surveyRename(pairs, rootsAt(at.root))
      expect(runtime.unreadable).toHaveLength(1)
      expect(runtime.unreadable[0]).toContain("tools/lib/load.ts:3")
      expect(runtimeReading(runtime).verdict).toBe("fail")
    } finally {
      at.dispose()
    }
  })

  test("refuses the move where the module holding it is itself what moves", () => {
    const at = fixture()
    try {
      at.put("pages/x.md", "# X\n")
      at.put(
        "tools/lib/load.ts",
        'import { resolve } from "node:path"\nconst directory = import.meta.dir\nexport const load = (file: string) => resolve(directory, file)\n'
      )
      const pairs = moves(["tools/lib/load.ts", "tools/load.ts"])
      const { runtime } = surveyRename(pairs, rootsAt(at.root))
      expect(runtime.unreadable).toHaveLength(1)
      expect(runtimeReading(runtime).verdict).toBe("fail")
    } finally {
      at.dispose()
    }
  })

  test("counts it without refusing where the call reaches nothing under the base", () => {
    const at = fixture()
    try {
      at.put("pages/x.md", "# X\n")
      at.put("pages/y.md", "# Y\n")
      at.put(
        "tools/lib/load.ts",
        'import { resolve } from "node:path"\nconst directory = import.meta.dir\nexport const load = (file: string) => resolve(directory, file)\n'
      )
      const pairs = moves(["pages/x.md", "pages/moved/x.md"])
      const { runtime } = surveyRename(pairs, rootsAt(at.root))
      expect(runtime.unread).toBe(1)
      expect(runtime.unreadable).toHaveLength(0)
      const outcome = runtimeReading(runtime)
      expect(outcome.verdict).toBe("pass")
      expect(outcome.detail).toContain("1 base(s) build a path this cannot read")
    } finally {
      at.dispose()
    }
  })

  test("states the paths it read rather than passing over the ones it changed nothing about", () => {
    const at = fixture()
    try {
      at.put("tools/ops/cli.ts", "export const cli = 1\n")
      at.put(
        "tools/tests/run.ts",
        "const CLI = `${import.meta.dir}/../ops/cli.ts`\nexport const c = CLI\n"
      )
      const pairs = moves(["pages/nothing.md", "pages/nowhere.md"])
      at.put("pages/nothing.md", "# Nothing\n")
      const { runtime } = surveyRename(pairs, rootsAt(at.root))
      expect(runtime.read).toBe(1)
      const outcome = runtimeReading(runtime)
      expect(outcome.verdict).toBe("pass")
      expect(outcome.population).toEqual({ measured: 1, unit: "relative runtime path(s)" })
    } finally {
      at.dispose()
    }
  })
})
