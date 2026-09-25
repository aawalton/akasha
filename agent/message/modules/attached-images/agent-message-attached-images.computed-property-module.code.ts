const AN_IMAGE = /^image-[0-9a-f]{16}$/

const CHECKOUT = "~/repos/akasha"

const ATTACHED_LINE =
  /^\[attached (image-[0-9a-f]{16}): Read ~\/repos\/akasha\/(?:\S+\/)?\1\.\S+\]$\n?/gm

const PARTED = "\n\n"

type Attached = { readonly text: string; readonly images: number }

export type Attaching = { readonly image: string; readonly bytesAt: string }

export function isImageSlug(said: string): boolean {
  return AN_IMAGE.test(said)
}

export function checkoutPath(at: string): string {
  return `${CHECKOUT}/${at}`
}

export function attachedLine(one: Attaching): string {
  return `[attached ${one.image}: Read ${checkoutPath(one.bytesAt)}]`
}

export function withImages(body: string, images: readonly Attaching[]): string {
  const lines = images.map(attachedLine).join("\n")
  if (lines === "") return body
  return body === "" ? lines : `${body}${PARTED}${lines}`
}

export function imagesOut(said: string): Attached {
  let images = 0
  const text = said.replace(ATTACHED_LINE, () => {
    images += 1
    return ""
  })
  return { text: text.trim(), images }
}
