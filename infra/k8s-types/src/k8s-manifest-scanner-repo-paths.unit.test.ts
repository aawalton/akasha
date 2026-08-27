import { describe, expect, test } from "bun:test"
import { scanManifestText } from "./k8s-manifest-scanner"

function at<T>(arr: readonly T[], i: number): T {
  const v = arr[i]
  if (v === undefined) throw new Error(`expected element at index ${i}, got undefined`)
  return v
}

describe("scanManifestText — repoPaths", () => {
  test("a container command carrying a container-absolute prefix yields the repo-relative path", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orchestrator
spec:
  template:
    spec:
      containers:
        - name: supervisor
          command:
            - bun
            - /app/repo/packages/shared/worker-supervisor/src/main.ts
          image: registry:5000/cluster/bun-git:latest
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).repoPaths).toEqual(["packages/shared/worker-supervisor/src/main.ts"])
  })

  test("an env value naming a program is picked up alongside the command", () => {
    const text = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orchestrator
spec:
  template:
    spec:
      containers:
        - name: supervisor
          command:
            - bun
            - /app/repo/packages/shared/worker-supervisor/src/main.ts
          env:
            - name: WORKER_MAIN_PATH
              value: /app/repo/packages/infra/ci/worker/src/main.ts
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).repoPaths).toEqual([
      "packages/shared/worker-supervisor/src/main.ts",
      "packages/infra/ci/worker/src/main.ts",
    ])
  })

  test("a repeated path is recorded once, in first-seen order", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: a
      args: ["packages/b/src/second.tsx", "packages/a/src/first.ts"]
    - name: b
      args: ["packages/a/src/first.ts"]
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).repoPaths).toEqual(["packages/b/src/second.tsx", "packages/a/src/first.ts"])
  })

  test("a doc naming no repo TypeScript reports an empty list rather than omitting the field", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: p
spec:
  containers:
    - name: a
      image: postgres:18
      volumeMounts:
        - mountPath: /var/lib/packages/data
          name: d
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).repoPaths).toEqual([])
  })

  test("each doc in a multi-doc file keeps only its own paths", () => {
    const text = `apiVersion: v1
kind: Pod
metadata:
  name: one
spec:
  containers:
    - name: a
      command: ["bun", "packages/one/src/main.ts"]
---
apiVersion: v1
kind: Pod
metadata:
  name: two
spec:
  containers:
    - name: b
      command: ["bun", "packages/two/src/main.ts"]
`
    const { docs } = scanManifestText(text)
    expect(at(docs, 0).repoPaths).toEqual(["packages/one/src/main.ts"])
    expect(at(docs, 1).repoPaths).toEqual(["packages/two/src/main.ts"])
  })
})
