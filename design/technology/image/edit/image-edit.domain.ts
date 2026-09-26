import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const imageEdit = {
  id: "01a0de63-929b-7315-bbb7-58352f26a9b4",
  type: "page-type/domain",
  slug: "image-edit",
  definition: "how a service is used to change a picture it is handed",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nano Banana is the service that changes a picture well.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nano Banana refuses a picture that is nsfw.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nano Banana runs only on Google's machines, never on local hardware.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every other service tried changes a picture too poorly to use.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "FLUX.1 Kontext dev drifts a face on a vague prompt and barely moves an expression.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The first Qwen-Image-Edit splits the scene or leaves a seam when it outpaints.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Qwen-Image-Edit and LongCat-Image-Edit inpaint below the quality Nano Banana sets.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Qwen-Image-Edit-2509 at int8 on the MacBook runs past thirty minutes for one inpaint.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An inswapper face swap keeps the landmarks of a face and loses the look of the person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nano Banana is handed one image of the person, with instructions for what to change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nano Banana keeps a face's likeness across many edits in a row.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No edit hands Nano Banana a second image as a reference.",
    },
  ],
} as const satisfies Domain
