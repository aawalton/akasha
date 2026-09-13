import {
  answerPicture,
  answerPictureAsked,
} from "akasha/alan/web/.server/picture-answering/picture-answering.module.code.ts"

export function loader({ request }: { request: Request }): Response {
  return answerPictureAsked(request)
}

export function action({ request }: { request: Request }): Promise<Response> {
  return answerPicture(request)
}
