const AN_IMAGE = /^image-[0-9a-f]{16}$/

const ATTACHED_LINE =
  /^\[attached (image-[0-9a-f]{16}): run `akasha alan picture \1`, then Read the path it names\]$\n?/gm

const PARTED = "\n\n"

export type Attached = { readonly text: string; readonly images: number }

export function isImageSlug(said: string): boolean {
  return AN_IMAGE.test(said)
}

export function attachedLine(image: string): string {
  return `[attached ${image}: run \`akasha alan picture ${image}\`, then Read the path it names]`
}

export function withImages(body: string, images: readonly string[]): string {
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
