import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, readdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { said } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { buildTargetOf } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-building/web-app-building.module.code.ts"
import {
  COMMIT_PLACEHOLDER,
  type ImageTarget,
  imageArgv,
  imageBuilt,
  imageTargetOf,
  webAppImage,
  webDockerfile,
  withCommit,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-imaging/web-app-imaging.module.code.ts"
import type { Plan } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-deploying/workload-deploying.module.code.ts"

const HOLD = "/var/tmp"

const SCRATCH_AT = "akasha-web-image-"

const EMPTY = mkdtempSync(join(HOLD, "akasha-imaging-tree-"))

said(["git", "-C", EMPTY, "init", "-q"])

afterAll(() => {
  rmSync(EMPTY, { recursive: true, force: true })
})

const SHA = "0123456789abcdef0123456789abcdef01234567"

const IMAGED = "registry.registry.svc.cluster.local:5000/web-app/one-web:0123456789ab"

function plan(containers: readonly string[]): Plan {
  const yaml = [
    "apiVersion: apps/v1",
    "kind: Deployment",
    "metadata:",
    "  name: web",
    "  namespace: one",
    "spec:",
    "  template:",
    "    spec:",
    "      containers:",
    ...containers,
    "",
  ].join("\n")
  return {
    workload: { kind: "Deployment", name: "web", namespace: "one" },
    synthPath: "one/web/web.manifest.code.ts",
    manifests: [
      {
        name: "web-deployment",
        path: "one/web/generated/web-deployment.generated.yaml",
        yaml,
        kind: "Deployment",
        resourceName: "web",
        namespace: "one",
      },
    ],
  }
}

const RUNNING_IMAGE = [
  "        - name: web",
  `          image: ${IMAGED}`,
  "          workingDir: /app/repo/one/web",
]

const TARGET: ImageTarget = {
  kind: "Deployment",
  namespace: "one",
  workload: "web",
  packagePath: "one/web",
  repository: "web-app/one-web",
  tag: "0123456789ab",
}

test("a web app's image is tagged with the commit it is built from", () => {
  expect(webAppImage("one-web", SHA)).toBe(IMAGED)
})

test("a written image naming the commit placeholder is given the deployed commit's tag", () => {
  const written = `          image: ${webAppImage("one-web", COMMIT_PLACEHOLDER)}\n`
  expect(written).toContain(":COMMIT\n")
  expect(withCommit(written, SHA)).toBe(`          image: ${IMAGED}\n`)
})

test("an image outside the web app repository keeps its placeholder tag", () => {
  const other = "          image: registry.registry.svc.cluster.local:5000/cluster/ci:COMMIT\n"
  expect(withCommit(other, SHA)).toBe(other)
})

test("a workload running a web app's image is built into that image", () => {
  expect(imageTargetOf(plan(RUNNING_IMAGE))).toEqual(TARGET)
})

test("a workload running an image of anything else has no image built for it", () => {
  const other = [
    "        - name: web",
    "          image: registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
    "          workingDir: /app/repo/one/web",
  ]
  expect(imageTargetOf(plan(other))).toBe(null)
})

test("a workload running a web app's image has no build made in its pod", () => {
  expect(buildTargetOf(plan(RUNNING_IMAGE))).toBe(null)
})

const RECIPE = webDockerfile("one/web", SHA, ["ONE"])

test("the image installs from the manifests before the tree is copied in", () => {
  expect(RECIPE.indexOf("COPY manifests/ ./")).toBeLessThan(RECIPE.indexOf("bun install"))
  expect(RECIPE.indexOf("bun install")).toBeLessThan(RECIPE.indexOf("COPY tree/ ./"))
})

test("the image is built by the checkout's builder into the folder the server reads", () => {
  expect(RECIPE).toContain("WORKDIR /app/repo/one/web")
  expect(RECIPE).toContain("BUILD_DIRECTORY=build /app/repo/node_modules/.bin/react-router build")
})

test("an image leaves the sha it was made from inside the build it made", () => {
  expect(RECIPE).toContain(`printf %s ${SHA} > build/.built-from`)
})

test("a value a build needs is mounted into the build by its name alone", () => {
  expect(RECIPE).toContain("--mount=type=secret,id=ONE,env=ONE")
})

test("a build needing nothing set mounts nothing", () => {
  expect(webDockerfile("one/web", SHA, [])).not.toContain("--mount")
})

test("the builder is handed each value by name, to read from its own environment", () => {
  expect(imageArgv("/var/tmp/held", TARGET, ["ONE"]).join(" ")).toContain("--secret id=ONE,env=ONE")
})

test("the image built is pushed under the tag the manifests name", () => {
  expect(imageArgv("/var/tmp/held", TARGET, []).join(" ")).toContain(
    `type=image,name=${IMAGED},push=true`
  )
})

function scratches(): number {
  return readdirSync(HOLD).filter((one) => one.startsWith(SCRATCH_AT)).length
}

test("a sha naming no commit builds no image and leaves no scratch", () => {
  const before = scratches()
  const built = imageBuilt(EMPTY, TARGET, "f".repeat(40))
  expect(built.why ?? "").toContain("could not be read out")
  expect(built.ran).toEqual([])
  expect(scratches()).toBe(before)
})
