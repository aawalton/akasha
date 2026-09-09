import type { Finding } from "../finding.page-type.types.ts"

export const aRespellThatLengthensImportSpecifiersCanPushAnImporterOverTheByteCeiling = {
  id: "01a08827-9337-767b-b181-e41b75cd0aeb",
  pageTypeSlug: "finding",
  slug: "a-respell-that-lengthens-import-specifiers-can-push-an-importer-over-the-byte-ceiling",
  domain: "workspace-package/change",
  claim:
    "A change that respells import specifiers longer can push an importer past the byte ceiling, and the refusal names the importer rather than the change that grew it. So the first reading is `why is this file too long`, which is the wrong question, and the change that grew it is nowhere in the message. The remedy is to take the repetition out of the importer rather than to divide it, because dividing pushes the respell out to every file that reaches in.",
  evidence:
    "Folding `temper-character-skills` into the root turned four `@akasha/temper-character-skills/...` specifiers in `temper/build-codec/build-codec-indices/build-codec-indices.module.code.ts` into repo-root file paths, about 180 bytes longer between them. The whole landing was refused: `15,121 bytes, over the 15,000 byte ceiling`. The file had been sitting 59 bytes under, and nothing had said so, because nothing had refused it.\n\nA folder move has the same arithmetic and more of it. A relative specifier that gets deeper grows its importer exactly as an absolute one that gets longer does, and a move rewrites more importers than a fold.\n\nDividing the module is the obvious answer and is the wrong one: every file reaching into it must then respell, which is the same failure one level removed. Taking the repetition out is the right one. That file held 27 index maps, 27 three-line `get*Index` functions and 28 three-line `get*Id` functions, each differing only in which array it closed over. Two factories and 55 one-line consts say the same thing, export the same names, and touched no importer at all: 14,940 bytes became about 10,400.\n\nThat shape is not special to index modules. Wherever a file must shrink and other files reach into it, the repetition inside is the part that can go without anyone outside knowing.",
} as const satisfies Finding
