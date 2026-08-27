import { describe, expect, test } from "bun:test"
import { buildNodeVolumes } from "./build-volumes"
import { emitDocumentsYaml } from "./emit-yaml"
import { getNode } from "./nodes"
import type { NodeIntent } from "./schema"

describe("buildNodeVolumes", () => {
  test("emits one UserVolumeConfig per declared store (node-03: registry + git-transport)", () => {
    const docs = buildNodeVolumes(getNode("node-03"))
    expect(docs).toEqual([
      {
        apiVersion: "v1alpha1",
        kind: "UserVolumeConfig",
        name: "registry",
        provisioning: {
          diskSelector: { match: "!system_disk && disk.size > 100u * GiB" },
          minSize: "50GB",
          maxSize: "50GB",
          grow: false,
        },
        filesystem: { type: "xfs" },
      },
      {
        apiVersion: "v1alpha1",
        kind: "UserVolumeConfig",
        name: "git-transport",
        provisioning: {
          diskSelector: { match: "!system_disk && disk.size > 100u * GiB" },
          minSize: "5GB",
          maxSize: "5GB",
          grow: false,
        },
        filesystem: { type: "xfs" },
      },
    ])
  })

  test("emits node-02's two inert CNPG UserVolumeConfig docs verbatim (postgres-data + postgres-wal)", () => {
    expect(buildNodeVolumes(getNode("node-02"))).toEqual([
      {
        apiVersion: "v1alpha1",
        kind: "UserVolumeConfig",
        name: "postgres-data",
        provisioning: {
          diskSelector: { match: "!system_disk && disk.size > 100u * GiB" },
          minSize: "100GB",
          maxSize: "100GB",
          grow: false,
        },
        filesystem: { type: "xfs" },
      },
      {
        apiVersion: "v1alpha1",
        kind: "UserVolumeConfig",
        name: "postgres-wal",
        provisioning: {
          diskSelector: { match: "!system_disk && disk.size > 100u * GiB" },
          minSize: "20GB",
          maxSize: "20GB",
          grow: false,
        },
        filesystem: { type: "xfs" },
      },
    ])
  })

  test("a non-growing volume derives maxSize from minSize (disk-packing)", () => {
    const node: NodeIntent = {
      ...getNode("node-04"),
      userVolumes: [
        {
          name: "fixed",
          diskSelector: "!system_disk",
          minSize: "32GB",
          grow: false,
          filesystem: "xfs",
        },
      ],
    }
    expect(buildNodeVolumes(node)[0]).toMatchObject({
      provisioning: { minSize: "32GB", maxSize: "32GB", grow: false },
    })
  })

  test("a growing volume leaves maxSize unset (fills the disk)", () => {
    const doc = buildNodeVolumes(getNode("node-04"))[0]
    expect(doc).toMatchObject({ provisioning: { grow: true } })
    const provisioning = doc?.["provisioning"]
    expect(typeof provisioning === "object" && provisioning !== null).toBe(true)
    expect(
      typeof provisioning === "object" && provisioning !== null && !("maxSize" in provisioning)
    ).toBe(true)
  })

  test("returns an empty list for a node with no node-local storage (node-05)", () => {
    expect(buildNodeVolumes(getNode("node-05"))).toEqual([])
  })

  test("rehearsal worker (rehearsal-04) carries the scratch mount-validation volume", () => {
    expect(buildNodeVolumes(getNode("rehearsal-04"))).toEqual([
      {
        apiVersion: "v1alpha1",
        kind: "UserVolumeConfig",
        name: "scratch",
        provisioning: {
          diskSelector: { match: "!system_disk" },
          minSize: "5GB",
          maxSize: "5GB",
          grow: false,
        },
        filesystem: { type: "xfs" },
      },
    ])
  })

  test("rehearsal control-plane nodes declare no user volumes", () => {
    expect(buildNodeVolumes(getNode("rehearsal-01"))).toEqual([])
  })

  test("prepends an EPHEMERAL VolumeConfig when ephemeralDiskSelector is set", () => {
    const node: NodeIntent = {
      ...getNode("node-06"),
      ephemeralDiskSelector: "!disk.rotational",
      userVolumes: [
        {
          name: "scratch",
          diskSelector: "!system_disk",
          minSize: "5GB",
          grow: false,
          filesystem: "xfs",
        },
      ],
    }
    const docs = buildNodeVolumes(node)
    expect(docs[0]).toEqual({
      apiVersion: "v1alpha1",
      kind: "VolumeConfig",
      name: "EPHEMERAL",
      provisioning: { diskSelector: { match: "!disk.rotational" }, grow: true },
    })
    expect(docs[1]).toMatchObject({ kind: "UserVolumeConfig", name: "scratch" })
  })

  test("carries maxSize through when present", () => {
    const node: NodeIntent = {
      ...getNode("node-04"),
      userVolumes: [
        {
          name: "capped",
          diskSelector: "!system_disk",
          minSize: "10GB",
          maxSize: "20GB",
          grow: false,
          filesystem: "ext4",
        },
      ],
    }
    expect(buildNodeVolumes(node)[0]).toMatchObject({
      provisioning: { minSize: "10GB", maxSize: "20GB" },
      filesystem: { type: "ext4" },
    })
  })
})

describe("emitDocumentsYaml", () => {
  test("joins documents with the YAML separator and round-trips node-04", () => {
    expect(emitDocumentsYaml(buildNodeVolumes(getNode("node-04")))).toBe(
      `apiVersion: v1alpha1
kind: UserVolumeConfig
name: seaweedfs
provisioning:
  diskSelector:
    match: "!system_disk && disk.size > 100u * GiB"
  minSize: 500GB
  grow: true
filesystem:
  type: xfs
`
    )
  })

  test("returns an empty string for no documents", () => {
    expect(emitDocumentsYaml([])).toBe("")
  })
})
