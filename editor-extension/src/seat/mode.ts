/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { z } from 'zod';

/**
 * Where a seat runs — the PLACE half of the two toggles.
 *
 * ON THE ROW, which is what makes this a narrowing rather than a reader. The harness takes
 * the `start-mode` key off the seat's own page and answers it as `mode` on every forest row,
 * so a caller here holds the value already and has only to check it is one of the two words.
 * A value outside them is a page stating something this panel has no toggle for, which is
 * why the schema refuses it rather than widening to admit it.
 */
export const SEAT_MODE_SCHEMA = z.enum(['interactive', 'headless']);
export type SeatMode = z.infer<typeof SEAT_MODE_SCHEMA>;
