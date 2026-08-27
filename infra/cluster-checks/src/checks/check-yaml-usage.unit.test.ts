import { describe, expect, test } from "bun:test"
import { classify, findOrphans, type SourceFile, stripComments } from "../lib/yaml-usage.ts"

const SVC = "packages/x/k8s/svc.yaml"

function src(path: string, content: string): SourceFile {
  return { path, content }
}

describe("classify — convention-by-location", () => {
  test(".sops.yaml at any path is a sops-config use", () => {
    const r = classify(".sops.yaml", [], [".sops.yaml"])
    expect(r).toEqual({ kind: "sops-config" })
  })

  test("nested .sops.yaml also recognized", () => {
    const r = classify("packages/foo/.sops.yaml", [], ["packages/foo/.sops.yaml"])
    expect(r).toEqual({ kind: "sops-config" })
  })

  test("sgconfig.yml is an ast-grep-config use", () => {
    const r = classify("sgconfig.yml", [], ["sgconfig.yml"])
    expect(r).toEqual({ kind: "ast-grep-config" })
  })

  test("sgconfig.yaml variant also recognized", () => {
    const r = classify("packages/x/sgconfig.yaml", [], ["packages/x/sgconfig.yaml"])
    expect(r).toEqual({ kind: "ast-grep-config" })
  })

  test("rules/ child next to sgconfig.yml is an ast-grep-rule", () => {
    const yamlPaths = ["pkg/sgconfig.yml", "pkg/rules/no-foo.yml"]
    const r = classify("pkg/rules/no-foo.yml", [], yamlPaths)
    expect(r).toEqual({ kind: "ast-grep-rule", sgconfig: "pkg/sgconfig.yml" })
  })

  test("rules/ child without sibling sgconfig is NOT an ast-grep-rule", () => {
    const yamlPaths = ["pkg/rules/no-foo.yml"]
    const r = classify("pkg/rules/no-foo.yml", [], yamlPaths)
    expect(r).toBeNull()
  })

  test("rules/ deeper-nested rule is NOT recognized (must be direct child)", () => {
    const yamlPaths = ["pkg/sgconfig.yml", "pkg/rules/sub/no-foo.yml"]
    const r = classify("pkg/rules/sub/no-foo.yml", [], yamlPaths)
    expect(r).toBeNull()
  })
})

describe("classify — direct-path reference", () => {
  test("yaml's full repo-relative path appears verbatim in source", () => {
    const sources = [src("workflow.ts", `kubectl apply -f packages/x/k8s/svc.yaml`)]
    const r = classify("packages/x/k8s/svc.yaml", sources, [])
    expect(r).toEqual({ kind: "direct-path", sourcePath: "workflow.ts" })
  })
})

describe("classify — split-path reference", () => {
  test("template-string concat: dir constant + ${dir}/<base>", () => {
    const sources = [
      src("workflow.ts", `const K8S = "packages/x/k8s"\n` + "kubectlApply(`${K8S}/svc.yaml`)\n"),
    ]
    const r = classify("packages/x/k8s/svc.yaml", sources, [])
    expect(r).toEqual({ kind: "split-path", sourcePath: "workflow.ts" })
  })

  test("dir present but basename absent → not split-path", () => {
    const sources = [src("workflow.ts", `const K8S = "packages/x/k8s"\nconsole.log(K8S)`)]
    const r = classify("packages/x/k8s/svc.yaml", sources, [])
    expect(r).toBeNull()
  })
})

describe("classify — directory-ref", () => {
  test("kubectlApply-style directory batch ref", () => {
    const sources = [src("workflow.ts", `kubectlApply({ files: "packages/x/k8s/" })`)]
    const r = classify("packages/x/k8s/svc.yaml", sources, [])
    expect(r).toEqual({
      kind: "directory-ref",
      sourcePath: "workflow.ts",
      dir: "packages/x/k8s",
    })
  })

  test("glob form '<dir>/**' does NOT count as directory-ref", () => {
    const sources = [src("workflow.ts", `"packages/x/k8s/**"`)]
    const r = classify("packages/x/k8s/svc.yaml", sources, [])
    expect(r).toBeNull()
  })

  test("sibling-file path '<dir>/<sibling>.yaml' does NOT credit other yamls", () => {
    const sources = [src("workflow.ts", `"packages/x/k8s/sibling.yaml"`)]
    const r = classify("packages/x/k8s/svc.yaml", sources, [])
    expect(r).toBeNull()
  })

  test("trailing slash followed by quote is a directory-ref", () => {
    const sources = [src("workflow.ts", `"packages/x/k8s/"`)]
    const r = classify("packages/x/k8s/svc.yaml", sources, [])
    expect(r?.kind).toBe("directory-ref")
  })
})

describe("classify — orphan", () => {
  test("no source references → null", () => {
    const r = classify("packages/x/k8s/orphan.yaml", [], [])
    expect(r).toBeNull()
  })
})

describe("findOrphans", () => {
  test("returns only yaml files with no recognized use, sorted", () => {
    const yamlPaths = [
      "packages/x/k8s/svc.yaml",
      "packages/x/k8s/orphan.yaml",
      ".sops.yaml",
      "packages/y/orphan.yml",
    ]
    const sources = [src("workflow.ts", `kubectl apply -f packages/x/k8s/svc.yaml`)]
    const orphans = findOrphans({ yamlPaths, sources })
    expect(orphans).toEqual([
      { path: "packages/x/k8s/orphan.yaml" },
      { path: "packages/y/orphan.yml" },
    ])
  })

  test("clean repo → empty array", () => {
    const yamlPaths = [".sops.yaml", "sgconfig.yml"]
    expect(findOrphans({ yamlPaths, sources: [] })).toEqual([])
  })
})

describe("findOrphans — a comment is not a use site", () => {
  function orphansOf(sources: readonly SourceFile[]): readonly string[] {
    return findOrphans({ yamlPaths: [SVC], sources }).map((o) => o.path)
  }

  test("a TypeScript line comment naming the yaml does not credit it", () => {
    expect(
      orphansOf([src("w.ts", `// TODO: someday apply ${SVC} — nothing applies it today`)])
    ).toEqual([SVC])
  })

  test("a TypeScript block comment naming the yaml does not credit it", () => {
    expect(orphansOf([src("w.ts", `/**\n * see ${SVC}\n */\nexport const x = 1`)])).toEqual([SVC])
  })

  test("a shell comment naming the yaml does not credit it", () => {
    expect(orphansOf([src("run.sh", `#   e.g. run.sh ${SVC}\nset -eu`)])).toEqual([SVC])
  })

  test("a CSS block comment naming the yaml does not credit it", () => {
    expect(orphansOf([src("a.css", `/* generated from ${SVC} */\n.a { color: red }`)])).toEqual([
      SVC,
    ])
  })

  test("a comment in a JSON config does not credit it", () => {
    expect(orphansOf([src("knip.json", `{\n  // entry for ${SVC}\n  "entry": []\n}`)])).toEqual([
      SVC,
    ])
  })

  test("a directory-batch reference inside a comment does not credit it", () => {
    expect(orphansOf([src("run.sh", `#   templates into packages/x/k8s/ from a seed`)])).toEqual([
      SVC,
    ])
  })

  test("the same path as code still credits, in every one of those languages", () => {
    expect(orphansOf([src("w.ts", `apply("${SVC}")`)])).toEqual([])
    expect(orphansOf([src("run.sh", `kubectl apply -f ${SVC}`)])).toEqual([])
    expect(orphansOf([src("a.css", `.a { background: url(${SVC}) }`)])).toEqual([])
    expect(orphansOf([src("knip.json", `{ "entry": ["${SVC}"] }`)])).toEqual([])
  })
})

describe("stripComments — string literals are code, not comments", () => {
  test("`//` inside a TypeScript string survives", () => {
    const line = `const u = "https://h/${SVC}"`
    expect(stripComments("w.ts", line)).toBe(line)
  })

  test("`//` inside an unquoted CSS url() survives", () => {
    const line = `.a { background: url(https://h/${SVC}) }`
    expect(stripComments("a.css", line)).toBe(line)
  })

  test("`#` inside a shell string survives", () => {
    const line = `echo "tag#1 ${SVC}"`
    expect(stripComments("run.sh", line)).toBe(line)
  })

  test("`#` mid-word survives, so parameter expansion is not a comment", () => {
    const line = `echo "${"${CONFIG#*/}"}" $# ${SVC}`
    expect(stripComments("run.sh", line)).toBe(line)
  })

  test("a stripped comment leaves a separator, so it cannot join two fragments", () => {
    expect(stripComments("w.ts", `"packages/x/k8s/"/* c */"svc.yaml"`)).not.toContain(
      "packages/x/k8s/svc.yaml"
    )
  })
})

describe("stripComments — an unreadable language stops the run", () => {
  test("an extension with no declared comment syntax throws", () => {
    expect(() => stripComments("train.py", `# ${SVC}`)).toThrow(/no comment syntax declared/)
  })

  test("an extensionless path throws rather than defaulting to unstripped", () => {
    expect(() => stripComments("Makefile", `# ${SVC}`)).toThrow(/no comment syntax declared/)
  })
})
