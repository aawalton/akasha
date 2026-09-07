#!/usr/bin/env bun

import { node01 } from "../pages/node-01.host.ts"
import { node02 } from "../pages/node-02.host.ts"
import { node03 } from "../pages/node-03.host.ts"
import { node04 } from "../pages/node-04.host.ts"
import { node05 } from "../pages/node-05.host.ts"
import { node06 } from "../pages/node-06.host.ts"

export type ClusterNode = {
  slug: string
  address: string
  loginUser: string
}

export const clusterNodes: readonly ClusterNode[] = [
  node01,
  node02,
  node03,
  node04,
  node05,
  node06,
].map((host) => ({ slug: host.slug, address: host.address, loginUser: host.loginUser }))

export function clusterNodesTable(): string {
  return clusterNodes.map((node) => `${node.slug}\t${node.address}\t${node.loginUser}`).join("\n")
}

if (import.meta.main) {
  process.stdout.write(`${clusterNodesTable()}\n`)
}
