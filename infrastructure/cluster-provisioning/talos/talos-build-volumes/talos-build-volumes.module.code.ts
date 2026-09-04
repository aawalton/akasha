import type { MachineConfigPatch, NodeIntent } from "../talos-schema/talos-schema.module.code.ts"

function userVolumeDoc(volume: NodeIntent["userVolumes"][number]): MachineConfigPatch {
  const maxSize = volume.maxSize ?? (volume.grow ? undefined : volume.minSize)
  return {
    apiVersion: "v1alpha1",
    kind: "UserVolumeConfig",
    name: volume.name,
    provisioning: {
      diskSelector: { match: volume.diskSelector },
      ...(volume.minSize !== undefined && { minSize: volume.minSize }),
      ...(maxSize !== undefined && { maxSize }),
      grow: volume.grow,
    },
    filesystem: { type: volume.filesystem },
  }
}

function ephemeralVolumeDoc(diskSelector: string): MachineConfigPatch {
  return {
    apiVersion: "v1alpha1",
    kind: "VolumeConfig",
    name: "EPHEMERAL",
    provisioning: {
      diskSelector: { match: diskSelector },
      grow: true,
    },
  }
}

export function buildNodeVolumes(node: NodeIntent): readonly MachineConfigPatch[] {
  const docs: MachineConfigPatch[] = node.userVolumes.map(userVolumeDoc)
  if (node.ephemeralDiskSelector !== undefined) {
    docs.unshift(ephemeralVolumeDoc(node.ephemeralDiskSelector))
  }
  return docs
}
