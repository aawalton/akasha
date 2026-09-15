const DIACRITICS = /[̀-ͯ]/g

const APOSTROPHES = /['’]/g

const NOT_ALPHANUMERIC = /[^A-Za-z0-9]+/g

const EDGE_DASHES = /^-+|-+$/g

export const STEM_CEILING = 100

export function pageStem(text: string): string {
  return text
    .normalize("NFKD")
    .replace(DIACRITICS, "")
    .replace(APOSTROPHES, "")
    .replace(NOT_ALPHANUMERIC, "-")
    .replace(EDGE_DASHES, "")
    .toLowerCase()
}
