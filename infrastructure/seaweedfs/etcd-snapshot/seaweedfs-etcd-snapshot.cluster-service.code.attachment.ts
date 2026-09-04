import { etcdSnapshotCronJobYaml } from "../seaweedfs-etcd-snapshot-manifests/seaweedfs-etcd-snapshot-manifests.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "etcd-snapshot", yaml: etcdSnapshotCronJobYaml() }]
}
