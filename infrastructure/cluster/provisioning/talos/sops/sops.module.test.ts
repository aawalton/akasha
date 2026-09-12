import { describe, expect, test } from "bun:test"
import {
  type Encrypting,
  encryptFile,
} from "akasha/infrastructure/cluster/provisioning/talos/sops/sops.module.code.ts"

const DEST = "/var/tmp/nowhere/secrets.sops.yaml"

const SRC = "/var/tmp/nowhere/secrets.yaml"

const WROTE = `wrote ${DEST}, which is every node's PKI`

function encrypting(stops: keyof Encrypting | null): Encrypting {
  return {
    ran: async () => {
      if (stops === "ran") throw new Error("sops exited 1")
      return "encrypted"
    },
    wrote: async () => {
      if (stops === "wrote") throw new Error("the disk is full")
    },
    moded: async () => {
      if (stops === "moded") throw new Error("chmod refused")
    },
  }
}

describe("encryptFile", () => {
  test("names both writes where nothing threw", async () => {
    const done: string[] = []
    await encryptFile(SRC, DEST, done, encrypting(null))
    expect(done).toEqual([WROTE, `set ${DEST} to mode 0600`])
  })

  test("names nothing where sops itself threw", async () => {
    const done: string[] = []
    await expect(encryptFile(SRC, DEST, done, encrypting("ran"))).rejects.toThrow("sops exited 1")
    expect(done).toEqual([])
  })

  test("names nothing where the write threw", async () => {
    const done: string[] = []
    await expect(encryptFile(SRC, DEST, done, encrypting("wrote"))).rejects.toThrow(
      "the disk is full"
    )
    expect(done).toEqual([])
  })

  test("names the bundle written where the mode threw after it", async () => {
    const done: string[] = []
    await expect(encryptFile(SRC, DEST, done, encrypting("moded"))).rejects.toThrow("chmod refused")
    expect(done).toEqual([WROTE])
  })

  test("keeps what the caller did before it in the list", async () => {
    const done: string[] = ["generated the bundle into the temporary folder"]
    await encryptFile(SRC, DEST, done, encrypting("moded")).catch(() => undefined)
    expect(done).toEqual(["generated the bundle into the temporary folder", WROTE])
  })
})
