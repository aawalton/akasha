import { STATE } from "../lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"

const SUPPORTED_BOOKSHELF_LOCALES: Record<string, boolean> = {
  en: true,
  de: true,
  fr: true,
  ru: true,
}

export const BOOK_SHELF_LOCALIZATION: Record<string, string> = {
  en: "Bookshelf",
  de: "Bücherregal",
  fr: "Étagère de livres",
  ru: "Книжная полка",
}

export const BOOK_STACK_LOCALIZATION: Record<string, string> = {
  en: "Book Stack",
  de: "Bücherstapel",
  fr: "Pile de livres",
  ru: "Стопка книг",
}

export const BOOK_LOCALIZATION: Record<string, string> = {
  en: "Book",
  de: "Buch",
  fr: "Livre",
  ru: "Книга",
}

export function initializeLocales(): undefined {
  const locale = GetCVar("Language.2")
  STATE.currentBookshelfLocale = SUPPORTED_BOOKSHELF_LOCALES[locale] === true ? locale : "en"
}
